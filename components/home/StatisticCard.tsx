import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

type StatisticCardProp = {
  title: string;
  description: string;
  total: number;
  after?: string;
};

const StatisticCard = ({
  title = "",
  description = "",
  total = 0,
  after = "",
}: StatisticCardProp) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    if (!isActive) setStart(!isNaN(total) ? total : 0);
    if (isActive) setStart(0);
  }, [isActive, total]);

  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <div className="statistic flex flex-col items-center justify-center gap-1 text-white">
      <div className="statistic-num mb-1 text-[40px] font-semibold">
        <span>
          {/* <CountUp
            start={start}
            end={!isNaN(total) ? total : 0}
            duration={hasAnimated ? 0 : 2}
            delay={hasAnimated ? 0 : 0.5}
          >
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp> */}
          {total}
        </span>
        {after}
      </div>
      <div className="statistic-text text-xs">{title}</div>
      <div className="statistic-text text-xs">{description}</div>
    </div>
  );
};

export default StatisticCard;
