import { ColumnData, RowValues, RowData } from './table';

const deleteButton = document.createElement('button');
deleteButton.innerHTML = '&#x2716;';
deleteButton.setAttribute('title', 'Delete this row');

export const defaultsHeadings: ColumnData[] = [
    {
        name: 'Name',
        notEditable: true,
    },
    {
        name: 'Set'
    },
    {
        name: 'Set Text Color',
        color: true,
    },
    {
        name: 'Set Background Color',
        color: true,
    },
    {
        name: 'Copyright',
    },
    {
        name: 'Legal',
    },
    {
        name: 'Logo URL',
    },
    {
        name: 'Logo Scale',
        type: 'number',
    }
];

export const defaultsRows: RowValues[] = [
    {
        name: '__defaults__',
        logoURL: 'https://i.imgur.com/J6SuXcE.png',
        set: 'Teen Titans',
        setTextColor: '#ffec34',
        setBackgroundColor: '#ed1c24',
        copyright: '2015 CZE',
        legal: 'TEEN TITANS and all related character and elements are trademarks and © DC Comics\n(s15)',
        logoScale: 0.6,
    },
    {
        name: '__oversized_defaults__',
        //legal: 'All Overwatch characters and elements © and ™ Blizzard.\n(s01)',
        logoScale: 0.85,
        setTextColor: '#ffec34',
        setBackgroundColor: '#ed1c24',
    },
];

export const cardsHeadings: ColumnData[] = [
    {
        name: 'Name',
    },
    {
        name: 'Type',
        allowedValues: ['Equipment', 'Hero', 'Location', 'Starter', 'Super Power', 'Villain', 'Weakness'],
    },
    {
        name: 'Text',
        longText: true,
    },
    {
        name: 'Cost',
        type: 'number'
    },
    {
        name: 'VP',
        type: 'number'
    },
    {
        name: 'Subtype'
    },
    {
        name: 'Variant',
        type: 'boolean',
    },
    {
        name: 'Oversized',
        type: 'boolean',
    },
    {
        name: 'Image URL',
    },
    {
        name: 'Delete',
        type: 'node',
        defaultValue: deleteButton,
    },
];

export const cardsRows: RowValues[] = [
    {
        name: 'Shot',
        type: 'Starter',
        text: '+1 Power',
        imageURL: 'https://i.imgur.com/sFmPfjn.png',
    },
    {
        name: "Wonder Girl",
        type: 'Hero',
        oversized: true,
        imageURL: 'https://i.imgur.com/RjNwCAX.png',
        text: 'Once during each of your turns, if you control two or more Equipment, draw two cards and then discard a card.'
    }
];
