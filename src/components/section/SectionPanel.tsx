import React from 'react'

interface Props {
  children: React.ReactNode
}

export const SectionPanel = (props: Props) => <div>{props.children}</div>
