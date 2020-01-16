DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
  name TEXT,
  class TEXT,
  race TEXT,
  gender TEXT,
  size TEXT,
  age INTEGER,
  language TEXT,
  speed INTEGER,
  strength INTEGER,
  dexterity INTEGER,
  constitution INTEGER,
  intelligence INTEGER,
  wisdom INTEGER,
  charisma INTEGER,
  hit_points INTEGER,
  hit_dice TEXT);

INSERT INTO characters VALUES (
  "Brock Whitebread",
  "Bard",
  "Dwarf",
  "Male",
  "Medium",
  67,
  "Dwarvish",
  25,
  13,
  16,
  11,
  11,
  8,
  16,
  8,
  "1d8"
);
INSERT INTO characters VALUES (
  "Tyler Lane",
  "Wizard",
  "Elf",
  "Void",
  "Medium",
  128,
  "Elvish",
  30,
  9,
  15,
  14,
  16,
  11,
  10,
  8,
  "1d6"
);
INSERT INTO characters VALUES (
  "Kat Danger",
  "Warlock",
  "Tiefling",
  "404 Not Found",
  "Medium",
  26,
  "Infernal",
  30,
  9,
  12,
  14,
  14,
  10,
  17,
  10,
  "1d8"
)
