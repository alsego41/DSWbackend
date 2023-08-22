export class Property {
    constructor(
        public idProperty: Number,
        public nameProperty: String,
        public statusProperty: String,
        public photo: String,
        public address: String,
        public zone: String,
        public m2: Number,
        public spaces: Number,
        public roomQty: Number,
        public bathQty: Number,
        public backyard: Boolean,
        public grill: Boolean
    ) {}
}