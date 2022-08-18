export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: "/user/:_id", action: "userGet"},
        { path: "/users", action: "usersGet"},
        { path: "/leaderboard/:_id(.*)", action: "leaderboardGet"}
      ],
      post: [
        { path: '/user', action: 'userAdd' },
        { path: '/admin/leaderboard', action: 'leaderboardAdd' },
        { path: '/leaderboard/:_id/user/:user_id/add_score', action: 'entryAdd' }
      ]
    };
  },
};
