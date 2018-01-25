

export class Level {
    constructor(id = 1) {
        this.id = id;
        this._rowImages = this.getReqImages();
    }

    createLevel(canavsCtx, resources) {
        const imgWidth = 101,
                imgHeight=  171;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {

                canavsCtx.drawImage(resources.get(this._rowImages[row]), col * imgWidth, (row - 1) * imgHeight / 2.8);
            }
        }
    }

    getReqImages() {
        switch (this.id) {
            case 1 :
                return [
                    'images/grass-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/stone-block.png',
                    'images/grass-block.png'
                ];
            case 2:
                return [
                    'images/grass-block.png',
                    'images/water-block.png'
                ];

        }
    }

    get numRows() {
        return this._rowImages.length;
    }

    get numCols() {
        return 5 // for now
    }


}