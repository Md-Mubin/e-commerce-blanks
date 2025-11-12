import React from 'react'

type SectionHeaderProps = {
  title: string
  underlineMarginLeft?: string // যেমন: "ml-36"
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  underlineMarginLeft = "ml-36",
  className = "",
}) => {
  return (
    <div>
      <div
        className={`inline-block border border-b-0 border-t-gray-300 border-x-gray-300 px-4 py-4 items-center ${className}`}
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
      </div>
      <div className={`border-b border-gray-300 mb-8 ${underlineMarginLeft}`}></div>
    </div>
  )
}

export default SectionHeader
