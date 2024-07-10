"use client"

import React from 'react'

const DashboardPrice = ({ title, datetime, description, credit, debit }) => {
  return (
<div key={title} className="flex items-center justify-between gap-20  p-4 border-b dark:border-neutral-200">
  <div className="flex-grow">
    <h3 className="text-neutral-100 dark:text-neutral-200">{title}</h3>
    <p className="text-sm text-neutral-300 dark:text-neutral-400">{datetime}</p>
    <p className="text-sm text-neutral-400 dark:text-neutral-400">{description}</p>
  </div>

  <div className="flex-shrink-0 flex items-center w-[30px]">
    {credit && (
      <p className="text-sm font-bold text-green-600 dark:text-green-400 mr-4">
        +{credit}
      </p>
    )}
    {debit && (
      <p className="text-sm font-bold text-red-600 dark:text-red-400 w-[1px]">
        -{debit}
      </p>
    )}
  </div>
</div>

  )
}

export default DashboardPrice