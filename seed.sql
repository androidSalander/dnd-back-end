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
  "Brock WC",
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
  "Chang Chang Chang",
	"Barbarian",
	"Dragonborn",
	"Male",
	"Medium",
	17,
	"Draconic",
	30,
	18,
	12,
	17,
	11,
	11,
	16,
	15,
	"1d12"
);
INSERT INTO characters VALUES (
  "Kat Danger",
  "Druid",
  "Wood Elf",
  "404 Not Found",
  "Medium",
  126,
  "Elvish",
  30,
  8,
  12,
  16,
  14,
  17,
  12,
  11,
  "1d8"
);
INSERT INTO characters VALUES (
  "Gladd Todfelter",
  "Ranger",
  "Half-Orc",
  "Male",
  "Medium",
  34,
  "Orc",
  30,
  15,
  16,
  12,
  14,
  13,
  15,
  9,
  "1d8"
);
INSERT INTO characters VALUES (
  "Joshua",
  "Rogue",
  "Gnome",
  "Male",
  "Small",
  44,
  "Gnomish",
  25,
  14,
  16,
  14,
  18,
  11,
  12,
  10,
  "1d8"
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username TEXT,
  email TEXT,
  password TEXT
);

INSERT INTO users VALUES (
  "MapleLeafTakeshi",
  "brockWC@brock.li",
  "pewtercity"
);
INSERT INTO users VALUES (
  "TylerTheDestroyer",
  "tylerL@underwater.pizza",
  "reactSUX"
);
INSERT INTO users VALUES (
  "MisterDungeonMaster",
  "katM@datalore.digital",
  "iAMthebonanaking"
);
