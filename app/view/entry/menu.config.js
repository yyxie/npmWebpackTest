export default [{
    'icon':'user',
    'name':'reflux使用',
    'key':'reflux test',
    'children':[{
        'path': '/a',
        'name':'store-action-view',
        'key': 'a'
    },{
        'path': '/b',
        'name':'action-view使用promise',
        'key': 'b'
    }]
},{
    'icon':'laptop',
    'name':'path test',
    'key': 'path test',
    'children':[{
        'path': '/parent/child',
        'name':'child',
        'key':'child'
    },{
        'path':'/detail/id',
        'name': 'id',
        'key': 'id'
    }]
},{
    'icon':'user',
    'name':'redux使用',
    'key':'redux test',
    'children':[{
        'path': '/counter',
        'name':'简单的redux学习demo',
        'key': 'counter'
    }]
}]