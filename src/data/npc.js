const allNpc = [
    {
        name: '段誉',
        image: 'assets/12.png',
        location: [150, 150],
        map: 1,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '你有看见王姑娘吗？'
            },
            {
                key: 'description',
                text: '查看',
                content: '段誉二十岁出头，大理世子，武功看起来初出茅庐，出手似乎很轻，但是遇到险情却有时能爆发出惊人的战斗力'
            },
            {
                key: 'fight',
                text: '战斗'
            }
        ]
    },
    {
        name: '穆念慈',
        image: 'assets/28.png',
        location: [330, 570],
        map: 1,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '希望过儿不要像他爹爹一样'
            },
            {
                key: 'description',
                text: '查看',
                content: '穆念慈二十多岁，武功看起来勉勉强强，出手似乎很轻'
            },
            {
                key: 'fight',
                text: '战斗'
            },
            {
                key: 'quest',
                text: '任务',
                quest: [
                    {
                        ask: '有好心人帮忙挑水吗？',
                        ans: '费了好大劲儿帮穆念慈装满了两缸水'
                    },
                    {
                        ask: '有好心人帮忙劈柴吗？',
                        ans: '费了好大劲儿帮穆念慈劈了10捆柴'
                    },
                    {
                        ask: '有好心人帮忙扫地吗？',
                        ans: '费了好大劲儿帮穆念慈打扫了整间房子'
                    }
                ],
                questId: 1
            }
        ]
    },
    {
        name: '武三通',
        image: 'assets/29.png',
        location: [810, 390],
        map: 1,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '我师父是一灯大师'
            },
            {
                key: 'description',
                text: '查看',
                content: '武三通四十多岁，武功看起来半生不熟，出手似乎不重'
            },
            {
                key: 'fight',
                text: '战斗'
            },
            {
                key: 'learn',
                text: '请教',
                subject: [
                    {
                        text: '基本拳脚 X 120',
                        key: 'basicAttack'
                    },
                    {
                        text: '基本轻功 X 120',
                        key: 'basicEvade'
                    },
                    {
                        text: '基本招架 X 120',
                        key: 'basicDefend'
                    }
                ]
            }
        ]
    }
];

export default allNpc