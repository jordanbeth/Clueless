export class CardHelper {

    private static CARD_NAME_TO_ID_MAP:{} = {
        'Colonel Mustard': 'colonelMustard',
        'Miss Scarlet': 'missScarlet',
        'Mr. Green': 'mrGreen',
        'Mrs. Peacock': 'mrsPeacock',
        'Mr. White': 'mrWhite',
        'Professor Plum': 'professorPlum',
        'Candle Stick': 'candleStick',
        'Knife': 'knife',
        'Lead Pipe':'leadPipe',
        'Revolver':'revolver',
        'Rope': 'rope',
        'Wrench':'wrench',
        'Study':'study',
        'Library':'library',
        'Conservatory':'conservatory',
        'Hall':'hall',
        'Billiard Room':'billiardRoom',
        'Ballroom':'ballroom',
        'Lounge':'lounge',
        'Dining Room':'diningRoom',
        'Kitchen':'kitchen'
    }

    static getCardHtmlId(cardName: string) {
        return CardHelper.CARD_NAME_TO_ID_MAP[cardName];
    }

    static getCardServerName(htmlId: string) {
        return Object.keys(CardHelper.CARD_NAME_TO_ID_MAP).find(key => CardHelper.CARD_NAME_TO_ID_MAP[key] === htmlId);
    }
}