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
        ],
        id: 1,
        ap: 300,
        maxHp: 5000,
        crit: 17,
        critDmg: 200,
        defence: 0,
        evade: 33,
        attackText: '挥拳向你打去',
        evadeText: '使用凌波微步躲了开去',
        level: 25,
        turnSkill: [
            {   
                type: 'rate',
                turn: 3,
                rate: 1.3
            }, 
        ],
        emergencySkill: [
            {
                type: 'real',
                percentage: 40,
                id: 1
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
        ],
        id: 2
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
        ],
        id: 3
    },
    {
        name: '郭靖',
        image: 'assets/41.png',
        location: [330, 270],
        map: 2,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '有我郭靖在一天，襄阳就一天不会被攻破'
            },
            {
                key: 'description',
                text: '查看',
                content: '郭靖四十多岁，武功看起来神功盖世，出手似乎不轻'
            },
            {
                key: 'fight',
                text: '战斗'
            }   
        ],
        id: 4
    },
    {
        name: '黄蓉',
        image: 'assets/14.png',
        location: [630, 270],
        map: 2,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '靖哥哥'
            },
            {
                key: 'description',
                text: '查看',
                content: '黄蓉四十多岁，武功看起来略有大成，出手似乎不轻'
            },
            {
                key: 'fight',
                text: '战斗'
            }   
        ],
        id: 5
    },
    {
        name: '郭芙',
        image: 'assets/26.png',
        location: [810, 570],
        map: 2,
        options: [
            {
                key: 'chat',
                text: '交谈',
                content: '我爹是郭靖大侠，我娘是黄蓉女侠，我外公是桃花岛岛主，你敢碰我一下要你好看'
            },
            {
                key: 'description',
                text: '查看',
                content: '郭芙十七八岁，武功看起来不足挂齿，出手似乎很轻'
            },
            {
                key: 'fight',
                text: '战斗'
            }   
        ],
        id: 6
    },
    
];

export default allNpc