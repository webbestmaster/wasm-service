/* global HTMLImageElement */

export class MarkdownItemCounter {
    private static readonly ImageToLoadCount = 2;

    private audio: number;
    private image: number;
    private video: number;

    public constructor() {
        this.audio = 0;
        this.image = 0;
        this.video = 0;
    }

    public increaseAudio(): undefined {
        this.audio += 1;
    }

    public increaseImage(): undefined {
        this.image += 1;
    }

    public increaseVideo(): undefined {
        this.video += 1;
    }

    public getLoadingImageType(): HTMLImageElement["loading"] {
        return this.getIsLazyImage() ? "lazy" : "eager";
    }

    private getIsLazyImage(): boolean {
        return this.image > MarkdownItemCounter.ImageToLoadCount;
    }
}
