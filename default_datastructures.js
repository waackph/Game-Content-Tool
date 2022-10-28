const defaultThought = {
    'Id': firstId,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'LinkageId': 0,
    'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': secondId,
        'Option': 'First link',
        '_validMoods': [0],
        'IsLocked': false,
        'linkType': 'conscious.DataHolderThoughtLink, conscious',
        'NextNode': {
          'Id': thirdId,
          'Thought': 'First node',
          'IsRoot': false,
          'LinkageId': 0,
          'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]
}

const defaultCombineThought = {
    'Id': forthId,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'LinkageId': 0,
    'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': fifthId,
        'Option': 'First link',
        '_validMoods': [0],
        'IsLocked': false,
        'linkType': 'conscious.DataHolderThoughtLink, conscious',
        'NextNode': {
          'Id': sixthId,
          'Thought': 'First node',
          'IsRoot': false,
          'LinkageId': 0,
          'thoughtType': 'conscious.DataHolderThoughtNode, conscious',
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]
}

const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem, conscious',
  'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 'DrawOrder': 3,
  'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
  'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1,
  'Thought': defaultCombineThought}

const defaultSequence = {'Commands': []};

const defaultCommand = {index: Math.random(), _destinationX: 0, _destinationY: 0, CommandType: 'conscious.DataHolderWalkCommand, conscious'}

const defaultNode = {'_dialogLine': '', '_edges': []};

const defaultLink = {'_dialogLine': '', 'MoodDependence': 0};

