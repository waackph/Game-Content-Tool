import { createRandomId } from '../helpers/GeneralHelpers';

const firstId = createRandomId();
const secondId = createRandomId();
const thirdId = createRandomId();
export const defaultThought = {
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
      'ValidMoods': [0],
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
  ]}

  const forthId = createRandomId();
  const fifthId = createRandomId();
  const sixthId = createRandomId();
  const defaultCombineThought = {
    'Id': forthId,
    'Thought': 'Descriptive Thought',
    'IsRoot': true,
    'LinkageId': 0,
    'x': 40,
    'y': 100,
    'Links': [
      {
        'Id': fifthId,
        'Option': 'First link',
        'ValidMoods': [0],
        'IsLocked': false,
        'linkType': 'conscious.DataHolderThoughtLink, conscious',
        'NextNode': {
          'Id': sixthId,
          'Thought': 'First node',
          'IsRoot': false,
          'LinkageId': 0,
          'x': 80,
          'y': 100,
          'Links': [],
        },
      }
    ]}
export const defaultCombineItem = {'Name': '', 'texturePath': '', 'ItemType': 'conscious.DataHolderItem, conscious',
'Rotation': 0, 'PositionX': 0, 'PositionY': 0, 'DrawOrder': 3,
'ExamineText': '', 'IsInInventory': false, 'UseAble': false, 'PickUpAble': false, 
'CombineAble': false, 'GiveAble': false, 'UseWith': false, 'ItemDependency': -1,
'Thought': defaultCombineThought}