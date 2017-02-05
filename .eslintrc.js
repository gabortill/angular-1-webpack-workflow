module.exports = {
    env: {
        browser: true,
    },
    extends: 'airbnb',
    globals: {
        angular: 1,
    },
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'import/first': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'sort-imports': ['error', {
            ignoreCase: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: [
                'none',
                'all',
                'single',
                'multiple',
            ],
        }],
        'sort-keys': ['error', 'asc', {
            caseSensitive: false,
            natural: true,
        }],
    },
};
