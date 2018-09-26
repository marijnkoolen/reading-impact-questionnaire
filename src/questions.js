
"use strict"

const questions = [
    {
        label: "Blijkt uit deze zin emotionele impact op de reviewer?",
        answerType: "likert",
        impactType: "emotional_scale",
        labels: ["Geen impact of heel twijfelachtig", "Zeer veel impact of heel duidelijk"],
        required: true,
        key: "emo_likert"
    },
    {
        label: "Blijken uit deze zin narratieve gevoelens bij de reviewer?",
        answerType: "likert",
        impactType: "narrative_scale",
        labels: ["Geen narratief gevoel zichtbaar", "Zeer sterk of duidelijk narratief gevoel"],
        required: true,
        key: "narr_likert"
    },
    {
        label: "Geeft de reviewer in deze zin blijk van gevoelens m.b.t. de stijl?",
        answerType: "likert",
        impactType: "style_scale",
        labels: ["Geen gevoel m.b.t. stijl zichtbaar", "Zeer sterk of duidelijk gevoel m.b.t. stijl"],
        required: true,
        key: "style_likert"
    },
    {
        label: "Als er bij de reviewer in deze zin sprake is van emotionele impact, narratieve gevoelens, of gevoelens m.b.t. de stijl, zijn deze dan:",
        answerType: "category",
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
        answerType: "likert",
        impactType: "reflection_scale",
        labels: ["Geen reflectie zichtbaar", "Zeer veel of duidelijke reflectie zichtbaar"],
        required: true,
        key: "refl_likert"
    },
];

export default questions;
