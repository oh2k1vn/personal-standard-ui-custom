import React from "react";

function App() {
  const matches = [
    {
      round: "VÒNG 1/8",
      matches: [
        {
          team1: "Co-well Asia FC",
          score1: 0,
          team2: "Stringee FC",
          score2: 1,
        },
        {
          team1: "EVNICT",
          score1: "0 (4)",
          team2: "Luvina FC",
          score2: "0 (5)",
        },
        { team1: "MIGITEK", score1: 6, team2: "Meey Group", score2: 0 },
        { team1: "CTIN", score1: 8, team2: "Newwave Sol.", score2: 1 },
        { team1: "LIFESUP", score1: 3, team2: "USOLV", score2: 6 },
        { team1: "Elcom FC", score1: 1, team2: "Nam Việt FC", score2: 2 },
        { team1: "iNET Domain ...", score1: 3, team2: "Kaopiz", score2: 4 },
        { team1: "Techvify FC", score1: 0, team2: "Savvycom FC", score2: 3 },
      ],
    },
    {
      round: "TỨ KẾT",
      matches: [
        { team1: "Stringee FC", score1: 3, team2: "Luvina FC", score2: 1 },
        { team1: "MIGITEK", score1: 0, team2: "CTIN", score2: 1 },
        {
          team1: "USOLV",
          score1: "2 (9)",
          team2: "Nam Việt FC",
          score2: "2 (10)",
        },
        { team1: "Kaopiz", score1: 3, team2: "Savvycom FC", score2: 1 },
      ],
    },
    {
      round: "BÁN KẾT",
      matches: [
        {
          team1: "Stringee FC",
          score1: "1 (1)",
          team2: "CTIN",
          score2: "1 (3)",
        },
        { team1: "Nam Việt FC", score1: 2, team2: "Kaopiz", score2: 1 },
      ],
    },
    {
      round: "CHUNG KẾT",
      matches: [
        { team1: "CTIN", score1: "2 (6)", team2: "Kaopiz", score2: "2 (5)" },
      ],
    },
  ];

  const [hoveredTeam, setHoveredTeam] = React.useState(null);

  const handleMouseEnter = (team) => {
    console.log("handleMouseEnter", team);
    setHoveredTeam(team);
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    setHoveredTeam(null);
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        {matches.map((round, index) => (
          <div key={index} className="py-4 px-10">
            <h2 className="text-lg font-bold mb-4 uppercase text-center">
              {round.round}
            </h2>
            <div className="h-full flex flex-col justify-center">
              {round.matches.map((match, idx) => (
                <div key={idx} className="mb-8 relative">
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 font-semibold">
                    {idx + 1}
                  </div>

                  {round.round != "CHUNG KẾT" &&
                  round.round != "Tranh hạng ba" ? (
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 -right-6 h-[2px] w-4 bg-blue-600 before:w-[2px] before:h-12 before:bg-blue-600 before:absolute ${
                        idx % 2
                          ? "rotate-180 before:right-4"
                          : "before:-right-[2px] "
                      }`}
                    ></div>
                  ) : null}

                  <div
                    className="flex justify-between items-center rounded-t overflow-hidden cursor-pointer border-b border-gray-100 *:py-1 *:text-sm"
                    onMouseEnter={() => handleMouseEnter(match.team1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className={`truncate flex-1 px-2 ${
                        hoveredTeam === match.team1
                          ? "bg-yellow-300"
                          : "bg-[#99eef7]"
                      }`}
                    >
                      {match.team1}
                    </span>
                    <span
                      className={`font-bold text-center w-[4rem] ${
                        hoveredTeam === match.team1
                          ? "bg-yellow-300"
                          : "bg-[#44b4fa]"
                      }`}
                    >
                      {match.score1}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center rounded-b overflow-hidden cursor-pointer *:py-1 *:text-sm"
                    onMouseEnter={() => handleMouseEnter(match.team2)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className={`truncate flex-1 px-2 ${
                        hoveredTeam === match.team2
                          ? "bg-yellow-300"
                          : "bg-[#99eef7]"
                      }`}
                    >
                      {match.team2}
                    </span>
                    <span
                      className={`font-bold text-center w-[4rem] ${
                        hoveredTeam === match.team2
                          ? "bg-yellow-300"
                          : "bg-[#44b4fa]"
                      }`}
                    >
                      {match.score2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
