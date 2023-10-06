import * as React from 'react'

export const metadata = {
  title: {
    default: 'Book',
    template: `Book | %s  `,
  },
}
export default function layout({ children }) {
  return <div>{children}</div>
}
