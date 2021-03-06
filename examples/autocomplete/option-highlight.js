const colors = require('ansi-colors');
const Prompt = require('../../lib/prompts/autocomplete');
const prompt = new Prompt({
  name: 'flavor',
  message: 'Pick your favorite flavor',
  highlight: colors.green,
  choices: [
    'almond',
    'apple',
    'banana',
    'cherry',
    'chocolate',
    'cinnamon',
    'coconut',
    'cotton candy',
    'grape',
    'nougat',
    'orange',
    'pear',
    'pineapple',
    'strawberry',
    'vanilla',
    'watermelon',
    'wintergreen'
  ]
});

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
