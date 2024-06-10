import React from 'react'

interface Props {
  children: React.ReactNode
}

export const SectionGroup = (props: Props) => <div>{props.children}</div>
