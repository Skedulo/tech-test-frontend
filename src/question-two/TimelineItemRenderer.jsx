import React from 'react';

export default function({ item, timelineContext, itemContext, getItemProps, getResizeProps }) {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? item.selectedBgColor : item.bgColor;
    const borderColor = item.color;
    return (
        <div
            {...getItemProps({
                style: {
                    backgroundColor,
                    color: itemContext.selected ? "#000" : "#fff",
                    borderColor,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderRadius: 4,
                    borderLeftWidth: itemContext.selected ? 3 : 1,
                    borderRightWidth: itemContext.selected ? 3 : 1
                }
            })}
        >
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

            <div style={{
                height: itemContext.dimensions.height,
                overflow: "hidden",
                paddingLeft: 3,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}
            >
                {itemContext.title}
            </div>

            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
        </div>
    );
}