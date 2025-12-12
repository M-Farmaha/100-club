import { List, Section, SectionWrap } from "./StatsSection-styled";

import { StatItem } from "./StatsItem";
import { useStateContext } from "../../state/stateContext";
import { filterOptionsByType } from "../../constants/constants";

export const StatsSection = () => {
  const { globalState } = useStateContext();
  const { members, tournaments } = globalState;

  const stages = tournaments.flatMap((t) => t.seasons.flatMap((s) => s.stages)).length;
  const players = members.length;
  const trainers = members.filter((member) => member.type === filterOptionsByType.coach.id);
  const experience = new Date().getFullYear() - 2016;

  const stats = [
    { name: "Турнірів проведено", count: stages, icon: "icon-stats-1" },
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
              <StatItem key={stat.name} name={stat.name} count={stat.count} icon={stat.icon} />
            ))}
          </List>
        </SectionWrap>
      </Section>
    </>
  );
};
