import { API } from "./restapi";

const apiRequirements: API[] = [
  // Based on https://piazza.com/class/keswqh47g2bm?cid=233
  // and NBA playoff bracket info on wikipedia
  {
    description: 'Get Pre-season Predictions',
    request: {
      requestURL: '/api/predictions/pre-season',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        categories: [
          {
            categoryType: 'MVP',
            categoryName: 'Most Valuable Player',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'DPOY',
            categoryName: 'Defensive Player of the Year',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'ROTY',
            categoryName: 'Rookie of the Year',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'MIP',
            categoryName: 'Most Improved Player',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'SMA',
            categoryName: 'Sixth Man Award',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'COTY',
            categoryName: 'Coach of the Year',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'ANFT',
            categoryName: 'All-NBA First Team',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'ANDFT',
            categoryName: 'All-NBA Defensive First Team',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'ANRFT',
            categoryName: 'All-NBA Rookie First Team',
            playerSet: [
              { playerId: 1, playerName: 'Giannis Antetokounmpo' },
              { playerId: 2, playerName: 'Anthony Davis' }
            ]
          },
          {
            categoryType: 'ECS',
            categoryName: 'Eastern Conference Seeding',
            teamSet: [
              { teamId: 1, teamName: 'Toronto Raptors' },
              { teamId: 2, teamName: 'Boston Celtics' }
            ]
          },
          {
            categoryType: 'WCS',
            categoryName: 'Western Conference Seeding',
            teamSet: [
              { teamId: 3, teamName: 'Los Angeles Lakers' },
              { teamId: 4, teamName: 'Houston Rockets' }
            ]
          }
        ]
      },
    },
  },
  {
    description: 'Update Pre-season Predictions',
    request: {
      requestURL: '/api/predictions/pre-season',
      requestMethod: 'PUT',
      body: {
        picks: [
          { categoryType: 'MVP', playerId: 1 },
          { categoryType: 'DPOY', playerId: 1 },
          // ... etc
          { categoryType: 'WCS', teamId: 3 },
        ]
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {},
    },
  },
  {
    description: 'Get Regular Season Predictions / Daily Picks',
    request: {
      requestURL: '/api/predictions/regular-season',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        homeTeam: [
          { matchId: 1, teamId: 1, teamName: 'Toronto Raptors', conference: 'EAST'},
          { matchId: 2, teamId: 3, teamName: 'Los Angeles Lakers', conference: 'WEST'}
        ],
        awayTeam: [
          { matchId: 1, teamId: 2, teamName: 'Boston Celtics', conference: 'EAST'},
          { matchId: 2, teamId: 4, teamName: 'Houston Rockets', conference: 'WEST'}
        ]
      },
    },
  },
  {
    description: 'Update Regular Season Predictions / Daily Picks',
    request: {
      requestURL: '/api/predictions/regular-season',
      requestMethod: 'PUT',
      body: {
        dailyPicks: [
          { matchId: 1, teamId: 1 },
          { matchId: 2, teamId: 3 }
        ]
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {},
    },
  },
  {
    description: 'Get Playoffs series picks',
    request: {
      requestURL: '/api/predictions/playoffs/series',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        firstRound: {
            eastA: {
              // A series is a best of 7
              seriesId: 1,
              teams: [
                { teamId: 1, teamName: 'Toronto Raptors' },
                { teamId: 2, teamName: 'Boston Celtics' }
              ],
              prediction: '4:1',
              // game start date/time
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            eastB: {
              seriesId: 2,
              teams: [
                { teamId: 5, teamName: 'Miami Heat' },
                { teamId: 6, teamName: 'Indiana Pacers' }
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            eastC: {
              seriesId: 3,
              teams: [
                { teamId: 5, teamName: 'Miami Heat' },
                { teamId: 6, teamName: 'Indiana Pacers' }
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            eastD: {
              seriesId: 4,
              teams: [
                { teamId: 5, teamName: 'Miami Heat' },
                { teamId: 6, teamName: 'Indiana Pacers' }
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            westA: {
              seriesId: 5,
              teams: [
                { teamId: 7, teamName: 'Denver Nuggets'},
                { teamId: 4, teamName: 'Houston Rockets'}
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            westB: {
              seriesId: 6,
              teams: [
                { teamId: 8, teamName: 'OKC Thunder'},
                { teamId: 4, teamName: ' Houston Rockets'}
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            westC: {
              seriesId: 7,
              teams: [
                { teamId: 8, teamName: 'OKC Thunder'},
                { teamId: 4, teamName: ' Houston Rockets'}
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            },
            westD: {
              seriesId: 8,
              teams: [
                { teamId: 8, teamName: 'OKC Thunder'},
                { teamId: 4, teamName: ' Houston Rockets'}
              ],
              prediction: '4:1',
              lockInTime: 'dd-mmm-yyyy hh:mm'
            }
          },
        semiFinals: {
          eastA: {
            seriesId: 9,
            teams: [
              { teamId: 1, teamName: 'Toronto Raptors' },
              { teamId: 2, teamName: 'Boston Celtics' }
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          },
          eastB: {
            seriesId: 10,
            teams: [
              { teamId: 5, teamName: 'Miami Heat' },
              { teamId: 6, teamName: 'Indiana Pacers' }
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          },
          westA: {
            seriesId: 11,
            teams: [
              { teamId: 7, teamName: 'Denver Nuggets'},
              { teamId: 4, teamName: 'Houston Rockets'}
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          },
          westB: {
            seriesId: 12,
            teams: [
              { teamId: 8, teamName: 'OKC Thunder'},
              { teamId: 4, teamName: ' Houston Rockets'}
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          }
        },
        conferenceFinals: {
          eastA: {
            seriesId: 13,
            teams: [
              { teamId: 1, teamName: 'Toronto Raptors' },
              { teamId: 2, teamName: 'Boston Celtics' }
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          },
          westA: {
            seriesId: 14,
            teams: [
              { teamId: 8, teamName: 'OKC Thunder'},
              { teamId: 4, teamName: ' Houston Rockets'}
            ],
            prediction: '4:1',
            lockInTime: 'dd-mmm-yyyy hh:mm'
          }
        },
        finals: {
          seriesId: 15,
          teams: [
            { teamId: 1, teamName: 'Toronto Raptors' },
            { teamId: 4, teamName: ' Houston Rockets'}
          ],
          prediction: '4:1',
          lockInTime: 'dd-mmm-yyyy hh:mm'
        }
      },
    },
  },
  {
    description: 'Update Playoffs series picks',
    request: {
      requestURL: '/api/predictions/playoffs/series',
      requestMethod: 'PUT',
      body: {
        firstRound: [
          { seriesId: 1, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 2, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 3, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 4, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 5, teamId: 4, conference: 'WEST', prediction: '4:1' },
          { seriesId: 6, teamId: 4, conference: 'WEST', prediction: '4:1' },
          { seriesId: 7, teamId: 4, conference: 'WEST', prediction: '4:1' },
          { seriesId: 8, teamId: 4, conference: 'WEST', prediction: '4:1' },
        ],
        semiFinals: [
          { seriesId: 9, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 10, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 11, teamId: 4, conference: 'WEST', prediction: '4:1' },
          { seriesId: 12, teamId: 4, conference: 'WEST', prediction: '4:1' },
        ],
        conferenceFinals: [
          { seriesId: 13, teamId: 1, conference: 'EAST', prediction: '4:1' },
          { seriesId: 14, teamId: 4, conference: 'WEST', prediction: '4:1' },
        ],
        finals: { 
          seriesId: 15, 
          teamId: 1, 
          prediction: '4:1' 
        }
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {},
    },
  },
  {
    description: 'Get Playoffs Daily picks',
    request: {
      requestURL: '/api/predictions/playoffs/daily',
      requestMethod: 'GET',
      body: {},
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {
        homeTeam: [
          { matchId: 1, teamId: 1, teamName: 'Toronto Raptors', conference: 'EAST'},
          { matchId: 2, teamId: 3, teamName: 'Los Angeles Lakers', conference: 'WEST'}
        ],
        awayTeam: [
          { matchId: 1, teamId: 2, teamName: 'Boston Celtics', conference: 'EAST'},
          { matchId: 2, teamId: 4, teamName: 'Houston Rockets', conference: 'WEST'}
        ]
      },
    },
  },
  {
    description: 'Update Playoffs Daily picks',
    request: {
      requestURL: '/api/predictions/playoffs/daily',
      requestMethod: 'PUT',
      body: {
        dailyPicks: [
          { matchId: 1, teamId: 1 },
          { matchId: 2, teamId: 3 }
        ]
      },
      queryParams: {},
    },
    response: {
      statusCode: 200,
      response: {},
    },
  },
];
