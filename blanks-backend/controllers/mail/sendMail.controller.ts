import nodemailer from 'nodemailer';

type SendMailProps = {
	to: string;
	subject: string;
	body?: string;
	title?: string;
	cc?: string;
	bcc?: string;
	attachment?: string;
	newsletterData?: any;
};

const sendMail = async ({
	to,
	subject,
	body,
	title,
	cc,
	bcc,
	attachment,
	newsletterData,
}: SendMailProps) => {
	try {
		// const htmlContent = generateEmailHtml(newsletterData);
		const htmlContent = body || '<p>No content provided.</p>';

		// Create transporter with better error handling
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: 587,
			secure: false,
			auth: {
				user: process.env.MAIL_ADDRESS,
				pass: process.env.MAIL_PASSWORD,
			},
			debug: true,
			logger: true,
		});

		// Verify transporter configuration
		await transporter.verify();

		const mailOptions: any = {
			from: `${title || 'MINT'} <${process.env.MAIL_ADDRESS}>`,
			to: to,
			...(cc && { cc: cc }),
			...(bcc && { bcc: bcc }),
			subject: subject,
			// text: body,
			// html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			// 	${body
			// 		.split('\n')
			// 		.map(line => `<p>${line}</p>`)
			// 		.join('')}
			// </div>`,
			html: htmlContent,
			...(attachment && {
				attachments: [
					{
						filename: 'Newsletter.pdf',
						path: attachment,
					},
				],
			}),
		};

		console.log('Mail Options:', {
			from: mailOptions.from,
			to: mailOptions.to,
			cc: mailOptions.cc || 'None',
			bcc: mailOptions.bcc || 'None',
			subject: mailOptions.subject,
			attachments: mailOptions.attachments ? 'Present' : 'None',
		});

		// Send email with proper promise handling
		const info = await transporter.sendMail(mailOptions);

		console.log('Email sent successfully!');
		console.log('Recipients:', {
			to: to,
			cc: cc || 'None',
			bcc: bcc || 'None',
		});
		console.log('Message ID:', info.messageId);
		console.log('Response:', info.response);

		return info;
	} catch (error: any) {
		console.error('Error in sendMail function:', error);
		console.error('Error details:', {
			message: error.message,
			code: error.code,
			command: error.command,
			response: error.response,
			responseCode: error.responseCode,
		});
		throw error;
	}
};

export default sendMail;

// import nodemailer from 'nodemailer';

// type SendMailProps = {
// 	to: string;
// 	subject: string;
// 	body: string;
// 	title?: string;
// 	cc?: string;
// 	bcc?: string;
// 	attachment?: string;
// };

// const sendMail = async ({ to, subject, body, title, cc, bcc, attachment }: SendMailProps) => {
// 	try {
// 		var transporter = nodemailer.createTransport({
// 			host: process.env.MAIL_HOST,
// 			port: 587,
// 			secure: false,
// 			auth: {
// 				user: process.env.MAIL_ADDRESS,
// 				pass: process.env.MAIL_PASSWORD,
// 			},
// 		});

// 		const mailOptions: any = {
// 			from: `${title || 'MINT'} <${process.env.MAIL_ADDRESS}>`,
// 			to: to,
// 			...(cc && { cc: cc }),
// 			...(bcc && { bcc: bcc }),
// 			subject: subject,
// 			text: body,
// 			...(attachment && { attachments: [{ fileName: 'Attachment', path: attachment }] }),
// 		};

// 		console.log('Mail Options:', mailOptions);

// 		transporter.sendMail(mailOptions, function (error, info) {
// 			if (error) {
// 				console.log('Error Sending Mail' + error);
// 			} else {
// 				console.log('Email sent: to email' + to + ': Resposnse:' + info.response);
// 			}
// 		});
// 	} catch (e) {
// 		console.log('Error Sending Mail');
// 	}
// };

// export default sendMail;
