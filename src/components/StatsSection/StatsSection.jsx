import { List, Section, SectionWrap } from "./StatsSection-styled";

import { StatItem } from "./StatsItem";
import { useStateContext } from "../../state/stateContext";

export const StatsSection = () => {
  const { globalState } = useStateContext();
  const { members } = globalState;

  const players = members.length;
  const trainers = members.filter((member) => member.type === "Тренер");
  const experience = new Date().getFullYear() - 2016;

  const stats = [
    { name: "Турнірів за рік", count: 45, icon: "icon-stats-1" },
    { name: "Гравців у клубі", count: players, icon: "icon-stats-2" },
    { name: "Років досвіду", count: experience, icon: "icon-stats-3" },
    { name: "Тренерів у клубі", count: trainers.length, icon: "icon-stats-4" },
  ];

  return (
    <>
      <Section>
        <SectionWrap>
          <List>
            {stats.map((stat) => (
              <StatItem
                key={stat.name}
                name={stat.name}
                count={stat.count}
                icon={stat.icon}
              />
            ))}
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
