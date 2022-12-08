import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay} = { ...props };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": (spots === 0)
  });

  const formatSpots = function(spots) {
    let spotString = "";
    if (spots === 0) {
      spotString += "no spots remaining";
    } else if (spots === 1) {
      spotString += "1 spot remaining";
    } else {
      spotString += `${spots} spots remaining`;
    }
    return spotString;
  }

  const formattedSpots = formatSpots(spots);  

  return (
    <li 
      className={dayClass}
      onClick={setDay}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text-light">{formattedSpots}</h3>
    </li>
  );
}