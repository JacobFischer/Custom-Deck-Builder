import { ColumnData, RowValues, RowData, RowValue } from './table';

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
        logoScale: 0.975,
    },
    /*{
        name: '__oversized_defaults__',
        logoScale: 0.975,
        setTextColor: '#ffec34',
        setBackgroundColor: '#ed1c24',
    },*/
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
        id: 'victoryPoints',
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
        transform: (checked: RowValue, row: RowData) => {
            if (checked && row.values.type !== 'Hero' && row.values.type !== 'Villain') {
                return false;
            }
            return checked;
        }
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
        name: 'Vulnerability',
        type: 'Starter',
        text: '',
        imageURL: 'https://i.imgur.com/em2ZPJG.png',
        vp: 0,
        cost: 0,
    },
    {
        name: "Wonder Girl",
        type: 'Hero',
        oversized: true,
        imageURL: 'https://i.imgur.com/RjNwCAX.png',
        text: 'Once during each of your turns, if you control two or more Equipment, draw two cards and then discard a card.'
    }
];
