import { API_URL } from '../services/config';

export const buildResource = (files, type, user_id) => {
    if(!files || !files.length) return [];

    let _files = files.map(f => {
        return {
            user_id,
            type,
            url: f,
            description: '',
            highlight: 0,
            workout: 0
        }
    });

    return _files;
}

export const asset_path = (path) => {
    if(!path) return '';

    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    
    if(regexp.test(path)) return path;
    return API_URL + path;
}

export const eligibilities = [
    { name: 'NCAA I', value: 'NCAA_I'},
    { name: 'NCAA II', value: 'NCAA_II'},
    { name: 'NCAA III', value: 'NCAA_III'},
    { name: 'NAIA', value: 'NAIA'},
    { name: 'NJCAA I', value: 'NJCAA_I'},
    { name: 'NJCAA II', value: 'NJCAA_II'},
    { name: 'NJCAA III', value: 'NJCAA_III'}
]

export const positions = [
    {value: 'QB'},
    {value: 'RB'},
    {value: 'FB'},
    {value: 'OL'},
    {value: 'WR'},
    {value: 'TE'},
    {value: 'DL'},
    {value: 'LB'},
    {value: 'CB'},
    {value: 'S'},
    {value: 'K'},
    {value: 'P'},
    {value: 'PR'},
    {value: 'LS'}
]

export const states = [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'}
]
