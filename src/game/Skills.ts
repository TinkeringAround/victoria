type TSkillCollection = {
    [name: string]: {
        description: string
        multiplier: number
    }
}

const SKILLS: TSkillCollection = {
    "Angriff": {
        description: "Erhöht Victoria's Waffen-Schaden",
        multiplier: 0.5 // 2 Punkte = 1 Schaden
    },
    "Verteidigung": {
        description: "Erhöht Victoria's Verteidgungsboni",
        multiplier: 0.75   // 4 Punkte = 7 Verteidigung
    },
    "Ausdauer": {
        description: "Erhöht Victoria's Lebenspunkte",
        multiplier: 1    // 1 Punkt = 1 Leben
    },
    "Alchemie": {
        description: "Verstärkt den Effekt von offensiven und defensiven Gegenständen",
        multiplier: 0.8  // 10 Punkte  = 8 Schaden
    },
    "Handwerk": {
        description: "Lässt Victoria bessere Gegenstände herstellen",
        multiplier: 0.8 // 10 Punkte = 8
    }
}

export default SKILLS;
