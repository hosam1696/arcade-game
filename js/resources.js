/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */

class Resource {
    constructor() {
        this.resourceCache = {};
        this.loading = [];
        this.readyCallbacks = [];
    }

    load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach((url) => {
                this._load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            this._load(urlOrArr);
        }
    }

    _load(url) {
        if(this.resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return this.resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            let img = new Image();
            img.onload = () => {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                this.resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(this.isReady()) {
                    this.readyCallbacks.forEach(func => func());
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            this.resourceCache[url] = false;
            img.src = url;
        }
    }

    get(url) {
        return this.resourceCache[url];
    }

    isReady() {
        let ready = true;
        for(let k in this.resourceCache) {
            if(this.resourceCache.hasOwnProperty(k) &&
                !this.resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    onReady(func) {
        this.readyCallbacks.push(func);
    }

}
let Resources = new Resource();

const imgWidth = 101,
      imgHeight = 171;
