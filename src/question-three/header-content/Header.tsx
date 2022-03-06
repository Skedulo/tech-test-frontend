import React from "react";
import './Header.css'
import { AppTabs, AvailableTabs } from '../../App'

interface IHeader {
  showTabs: boolean,
  showSupplementaryText?: boolean
}

const doNothing = () => {}

export const HeaderContent: React.FC<IHeader> = (props: IHeader) => {
  const { showTabs, showSupplementaryText } = props;
  return (
    <div className={
      "question-three__header-content " +
      (showTabs && "question-three__header-has-tabs")
    }>
      <h1 className="question-three__h1">
        Header
      </h1>
      {showSupplementaryText && (
        <>
          <div className="question-three__supplementary-text">
            Supplementary Text
          </div>
        </>
      )}
      {showTabs && (
        <AvailableTabs onSelect={doNothing} selectedTab={AppTabs.Third} />
      )}
    </div>
  )
}

