const emptyText = 'Привет пользователь!\n' +
    'Эта программа будет запускать сервер «keksobooking».\n' +
    'Автор: Шабруков М.В.';
const wrongText = 'Неизвестная команда { ?? }.\n' +
    'Чтобы прочитать правила использования приложения, наберите "--help"';
const versionText = 'v0.0.1';
const helpText = 'Доступные команды:\n' +
    '--help    — печатает этот текст;\n' +
    '--version — печатает версию приложения;';

const availableCommands = ['--version', '--help'];

//--- Получаем аргумент для нашего скрипта, undefined - если параметр не задан
let argument = process.argv[2];
//--- Получаем индекс команды среди возможных комманд
let commandIndex = availableCommands.indexOf(argument);
//--- Рассчитываем вариант действия
// 'wrong' - неверная команда, 'empty' - нет аргумента, иначе - возможная обрабатываемая команда
let action = argument ? commandIndex < 0 ? 'wrong' : availableCommands[commandIndex] : 'empty';

//--- Определяем обработчик действий
let actionHandler = {
    'empty': () => console.log(emptyText),
    'wrong': (param) => {
        console.error(wrongText.replace('??', param));
        process.exit(1);
    },
    '--version': () => console.log(versionText),
    '--help': () => console.log(helpText)
};
//--- Запуск обработчика
actionHandler[action](argument);

/*switch (action) {
    case 'empty':
        console.log(emptyText);
        break;
    case 'wrong':
        console.error(wrongText.replace('??', argument));
        process.exit(1);
        break;
    case '--version':
        console.log(versionText);
        break;
    case '--help':
        console.log(helpText);
        break;
}*/