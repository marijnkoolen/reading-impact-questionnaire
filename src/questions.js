
"use strict"

const questions = [
    {
        label: "Is er in deze zin sprake van emotionele impact op de reviewer?",
        answerType: "likert",
        impactType: "emotional_scale",
        labels: ["Geen impact of heel twijfelachtig", "Zeer veel impact of heel duidelijk"],
        required: true,
        key: "emo_likert"
    },
    {
        label: "Als er sprake is van emotionele impact op de reviewer, is deze dan",
        answerType: "category",
        impactType: "emotional_valence",
        labels: ["prettig", "onprettig", "onduidelijk"],
        required: true,
        key: "emo_valence"
    },
    {
        label: "Is er sprake van narratieve gevoelens bij de reviewer?",
        answerType: "likert",
        impactType: "narrative_scale",
        labels: ["Geen narratief gevoel zichtbaar", "Zeer sterk of duidelijk narratief gevoel"],
        required: true,
        key: "narr_likert"
    },
    {
        label: "Als er sprake is van narratieve gevoelens bij de reviewer, zijn deze dan",
        answerType: "category",
        impactType: "narrative_valence",
        labels: ["prettig", "onprettig", "onduidelijk"],
        required: true,
        key: "narr_valence"
    },
    {
        label: "Is er bij de reviewer sprake van gevoelens m.b.t. de stijl?",
        answerType: "likert",
        impactType: "style_scale",
        labels: ["Geen gevoel m.b.t. stijl zichtbaar", "Zeer sterk of duidelijk gevoel m.b.t. stijl"],
        required: true,
        key: "style_likert"
    },
    {
        label: "Als er bij de reviewer sprake is van gevoelens met betrekking tot de stijl, zijn deze dan",
        answerType: "category",
        impactType: "style_valence",
        labels: ["prettig", "onprettig", "onduidelijk"],
        required: true,
        key: "style_valence"
    },
    {
        label: "Is er bij de reviewer sprake van reflectie?",
        answerType: "likert",
        impactType: "reflection_scale",
        labels: ["Geen reflectie zichtbaar", "Zeer veel of duidelijke reflectie zichtbaar"],
        required: true,
        key: "refl_likert"
    },
];

export default questions;
