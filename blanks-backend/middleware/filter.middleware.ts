import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

type QueryType = {
	allowSort?: string[];
	allowSearch?: string[];
};

const filter = ({ allowSort = [], allowSearch = [] }: QueryType) => {
	return (req: Request, res: Response, next: NextFunction): any => {
		try {
			// Define the allowed operators for the MongoDB query.
			const allowOp = ['gt', 'gte', 'lt', 'lte', 'ne', 'in', 'btwn'];

			//Extract the 'search' parameter from the request query.
			//If it doesn't exist, default to an empty string.
			const { search = '' } = (req as any).query;

			// Initialize an array to hold the search fields.
			let searchFields: any[] = [];

			// Map over the allowed search fields and create a MongoDB query for each one.
			// The query uses the $regex operator to perform a case-insensitive search.
			searchFields = allowSearch.map(item => ({
				[item]: { $regex: search, $options: 'i' },
			}));

			let query: any = (req as any).queryHelper || {};

			// Only include $or operator if searchFields is not empty
			if (searchFields.length > 0) {
				query.$or = searchFields;
			}

			for (const key in req.query) {
				const [field, operator] = key.split('_');

				if (allowSort.includes(field) && req.query[key]) {
					if (
						field.endsWith('At') ||
						field.endsWith('Date') ||
						field === 'date'
					) {
						query[field] = getDate({ key, value: req.query[key] });
					} else {
						if (operator && allowOp.includes(operator)) {
							if (operator === 'in') {
								query[field] = { $in: (req as any).query[key].split(',') };
							} else if (operator === 'btwn') {
								const [from, to] = (req as any).query[key].split('_');
								query[field] = { $gte: from, $lte: to };
							} else {
								const mongoOperator = `$${operator}`;
								if (!query[field]) query[field] = {};
								query[field][mongoOperator] = req.query[key];
							}
						} else {
							query[field] = req.query[key];
						}
					}
				}
			}
			// console.log('req.query"""""',req.query)
			// console.log('req.query.size"""""',req.query.SIZE)
			// ✅ SIZE Filter Integration (Merged Cleanly)
			if (req.query.SIZE) {
				const sizes = String(req.query.SIZE)
					.split(',')
					.map(s => s.trim())
					.filter(Boolean);

				if (sizes.length) {
					const sizeConditions = [
						{ customAttributes: { $elemMatch: { value: { $in: sizes } } } },
						{
							'variations.attributes': {
								$elemMatch: { value: { $in: sizes } },
							},
						},
					];

					// Merge with existing query safely
					const andConditions: any[] = [];

					// Include existing search if any
					if (query.$or) andConditions.push({ $or: query.$or });

					// Include size filters
					andConditions.push({ $or: sizeConditions });

					// Include base fields (category, status, etc.)
					for (const [key, value] of Object.entries(query)) {
						if (key !== '$or' && key !== '$and') {
							andConditions.push({ [key]: value });
						}
					}

					// Replace final query with combined $and
					query = { $and: andConditions };
				}
			}

			(req as any).queryHelper = query;

			// console.log('✅ Final QueryHelper:', JSON.stringify(query, null, 2));
			next();
		} catch (e: any) {
			const msg =
				process.env.NODE_ENV === 'development'
					? e.message
					: 'Internal Server Error';
			return res.status(500).json({ message: msg });
		}
	};
};

const getStartOfDay = (value: string) => {
	return moment(value, 'YYYY-MM-DD').startOf('day').toDate();
};

const getEndOfDay = (value: string): Date => {
	return moment(value, 'YYYY-MM-DD').endOf('day').toDate();
};

/**
 * Generates a MongoDB date query condition based on the provided key and value.
 *
 * The key should follow the pattern "field_operator" where the operator can be:
 * - "gte" or "gt": for greater-than-or-equal comparisons.
 * - "lte" or "lt": for less-than comparisons.
 * - "btwn": for a between range (value should be "from_to").
 *
 * If no operator is specified in the key, the value is interpreted as a relative
 * or specific date query. For example:
 * - "days_7": 7 days ago until now.
 * - "today" or "daily": today's date.
 * - "weekly"/"week", "monthly"/"month", "yearly"/"year": respective ranges.
 * - Otherwise, the value is assumed to be a specific date string in "YYYY-MM-DD" format.
 *
 * @param {Object} params - The parameters for generating the date condition.
 * @param {string} params.key - A string in the format "field_operator" (e.g., "date_gte").
 * @param {string} params.value - The value used to build the query condition.
 * @returns {Object} A MongoDB query object with date conditions.
 */

const getDate = ({
	key,
	value,
}: {
	key: string;
	value: any;
}): Record<string, Date> => {
	// Destructure the key to get field and operator. The 'field' is currently unused.
	const [_, operator] = key.split('_');
	const [from, to] = value.split('_');

	let startOfDay, endOfDay;

	if (operator && (operator === 'gte' || operator == 'gt')) {
		return {
			$gte: getStartOfDay(value),
			//$lt: moment(value, 'YYYY-MM-DD').endOf('day').toDate(),
		};
	} else if (operator === 'lte' || operator == 'lt') {
		return {
			$lt: getEndOfDay(value),
			//	$gte: moment('1990-01-01', 'YYYY-MM-DD').startOf('day').toDate(),
		};
	} else if (operator === 'btwn') {
		startOfDay = moment(from, 'YYYY-MM-DD').startOf('day').toDate();
		endOfDay = moment(to || from, 'YYYY-MM-DD')
			.endOf('day')
			.toDate();
	} else {
		const [query, time] = value.split('_');
		if (query == 'days' || query == 'months') {
			startOfDay = moment().subtract(time, query).startOf('day').toDate();
			endOfDay = moment().endOf('day').toDate();
		} else if (value === 'today' || value === 'daily') {
			startOfDay = moment().startOf('day').toDate();
			endOfDay = moment().endOf('day').toDate();
		} else if (value === 'weekly' || value == 'week') {
			startOfDay = moment().subtract(1, 'weeks').startOf('day').toDate();
			endOfDay = moment().endOf('day').toDate();
		} else if (value === 'monthly' || value == 'month') {
			startOfDay = moment().subtract(1, 'months').startOf('day').toDate();
			endOfDay = moment().endOf('day').toDate();
		} else if (value === 'yearly' || value == 'year') {
			startOfDay = moment().subtract(1, 'years').startOf('day').toDate();
			endOfDay = moment().endOf('day').toDate();
		} else {
			startOfDay = moment(value, 'YYYY-MM-DD').startOf('day').toDate();
			endOfDay = moment(value, 'YYYY-MM-DD').endOf('day').toDate();
		}
	}

	return {
		$gte: startOfDay,
		$lt: endOfDay,
	};
};

export default filter;
