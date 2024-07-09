"use client"

import React from 'react'

const DashboardPrice = ({ title, datetime, description, credit, debit }) => {
  return (
    <div key={title} className="flex gap-10 items-center p-4 border-b dark:border-neutral-200">
                  <div className="flex-grow">
                    <h3 className="text-neutral-800 dark:text-neutral-200">{title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{datetime}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {credit && (
                      <p className="text-sm text-right text-green-600 dark:text-green-400">
                        +{credit}
                      </p>
                    )}
                    {debit && (
                      <p className="text-sm text-right text-red-600 dark:text-red-400">
                        -{debit}
                      </p>
                    )}
                  </div>
                </div>
  )
}

export default DashboardPrice