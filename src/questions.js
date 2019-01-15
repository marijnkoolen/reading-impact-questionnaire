
"use strict"

const questions = [
    {
        label: "Blijkt uit deze zin emotionele impact op de reviewer?",
        explanation: "Emotionele impact: elke (tijdelijke of blijvende) emotionele reactie tijdens of na het lezen, of dit nu betrekking heeft op het boek als geheel, de karakters, de auteur, de stijl, aspecten van de wereld die het boek beschrijft, of enig ander aspect. Deze gevoelens mogen positief of negatief zijn, sterk of zwak. Het gaat echter niet om gevoelens zoals verveling, waar het boek kennelijk niet het gewenste effect heeft.",
        answerType: "likert",
        questionType: "main-question",
        impactType: "emotional_scale",
        labels: ["Geen impact of heel twijfelachtig", "Zeer veel impact of heel duidelijk"],
        required: true,
        key: "emo_likert"
    },
    {
        label: "Blijken uit deze zin narratieve gevoelens bij de reviewer?",
        explanation: "Narratieve gevoelens: elk gevoel met betrekking tot de verhaalwereld en de personages. Het mag gaan om gevoelens van opgaan in het verhaal of de verhaalwereld of gevoelens voor personages, zoals bewondering, identificatie of medelijden.",
        answerType: "likert",
        questionType: "sub-question",
        impactType: "narrative_scale",
        labels: ["Geen narratief gevoel zichtbaar", "Zeer sterk of duidelijk narratief gevoel"],
        required: true,
        key: "narr_likert"
    },
    {
        label: "Geeft de reviewer in deze zin blijk van gevoelens m.b.t. de stijl?",
        explanation: "Gevoelens met betrekking tot de stijl: elk gevoel dat betrekking heeft op de aesthetische aspecten van de tekst, zoals bewondering, waardering, verrassing of vervreemding.",
        answerType: "likert",
        questionType: "sub-question",
        impactType: "style_scale",
        labels: ["Geen gevoel m.b.t. stijl zichtbaar", "Zeer sterk of duidelijk gevoel m.b.t. stijl"],
        required: true,
        key: "style_likert"
    },
    {
        label: "Als er bij de reviewer in deze zin sprake is van emotionele impact, narratieve gevoelens, of gevoelens m.b.t. de stijl, zijn deze dan:",
        explanation: "Prettig/onprettig: Het gaat hier om de gevoelens van de reviewer! Een 'afschuwelijke moord' is iets negatiefs, maar kan het beginpunt zijn voor een mooi verhaal. 'Prettig' is wat je aanzet tot lezen, 'onprettig' is waardoor je met lezen wilt stoppen.",
        answerType: "category",
        questionType: "main-question",
        impactType: "style_valence",
        labels: [
            {"value": "positive", "label": "prettig"},
            {"value": "negative", "label": "onprettig"},
            {"value": "both", "label": "zowel prettig als onprettig"},
            {"value": "na", "label": "niet van toepassing, neutraal of onduidelijk"},
        ],
        required: true,
        key: "style_valence"
    },
    {
        label: "Blijkt uit deze zin reflectie van de reviewer?",
        explanation: "Reflectie: gedachten, inzichten en mijmeringen over jezelf, de personages, het boek of de wereld.",
        answerType: "likert",
        questionType: "main-question",
        impactType: "reflection_scale",
        labels: ["Geen reflectie zichtbaar", "Zeer veel of duidelijke reflectie zichtbaar"],
        required: true,
        key: "refl_likert"
    },
];

export default questions;
