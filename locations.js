module.exports = {}

let voulat = {
	veilan: {
		structures: [],
		warpTo: ["the dome", "imia"],
	},
	imia: {
		structures: [],
		warpTo: ["veilan", "tarvin"],
	},
	tarvin: {
		structures: [],
		warpTo: ["imia", "kenox"],
		travelTo: "dreared",
	},
	kenox: {
		structures: [],
		warpTo: ["tarvin", "xynes"],
	},
	xynes: {
		structures: [],
		warpTo: ["whuv", "kenox"],
	},
	whuv: {
		structures: [],
		warpTo: ["xynes", "deia"],
	},
	deia: {
		structures: [],
		warpTo: ["whuv", "zyrneus"],
	},
	zyrneus: {
		structures: [],
		warpTo: ["deia", "remsea"],
	},
	remsea: {
		structures: [],
		warpTo: ["zyrneus", "valquin"],
	},
	valquin: {
		structures: [],
		warpTo: ["remsea", "nexus"],
	},
	nexus: {
		structures: [],
		warpTo: ["valquin", "sennar", "sylria"],
	},
	sylria: {
		structures: [],
		warpTo: ["nexus", "iantus"],
	},
	sennar: {
		structures: [],
		warpTo: ["nexus", "sophux"],
	},
	sophux: {
		structures: [],
		warpTo: ["sennar"],
		travelTo: "skroth",
	},
	iantus: {
		structures: [],
		warpTo: ["sylria", "dikarva", "talmdai"],
	},
	talmdai: {
		structures: [],
		warpTo: ["iantus", "kinra"],
	},
	dikarva: {
		structures: [],
		warpTo: ["jynadi", "iantus"],
	},
	jynadi: {
		structures: [],
		warpTo: ["the dome", "dikarva"],
	},
	"the dome": {
		structures: [],
		warpTo: ["xynes", "veilan", "jynadi"],
	},
	kinra: {
		structures: [],
		warpTo: ["talmdai", "la hilkeil"],
		travelTo: ["avarita"],
	},
	"la hilkeil": {
		structures: [],
		warpTo: ["kinra"],
	},
}

let vsystems = Object.keys(voulat)
vsystems.forEach((x) => {
	voulat[x].map = "voulat"
	module.exports[x] = voulat[x]
})
