export const getPlayerNameById = (id, members) => {
  const member = members.find((member) => member.id === id);
  return member ? member.name : "Невідомий учасник";
};
