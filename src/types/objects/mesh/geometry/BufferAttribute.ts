type TypedArray = Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;

export class BufferAttribute {
    private _data: TypedArray;
    private _size: number;
    private _dtype: number;
    private _normalize = false;
    private _stride = 0;
    private _offset = 0;
    private _buffer: WebGLBuffer | undefined;

    private _isDirty = true; // kita copy atribut minimal sekali di awal terlebih dahulu

    /**
     * Creates an instance of BufferAttribute.
     * @param {TypedArray} data Typed array data.
     * @param {number} size Size of each element in the buffer.
     * @param {object} options Options for attribute.
     * @memberof BufferAttribute
     */

    constructor(
        data: TypedArray,
        size: number,
        options: {
            dtype?: number,
            normalize?: boolean,
            stride?: number,
            offset?: number,
        } = {},
    ) {
        this._data      = data;
        this._size      = size;
        this._dtype     = options.dtype     || WebGLRenderingContext.FLOAT;
        this._normalize = options.normalize || false;
        this._stride    = options.stride    || 0;
        this._offset    = options.offset    || 0;
    }


    // Public get accessor to private properties.
    get data() { return this._data; }
    get size() { return this._size; }
    get dtype() { return this._dtype; }
    get normalize() { return this._normalize; }
    get stride() { return this._stride; }
    get offset() { return this._offset; }
    get isDirty() { return this._isDirty; }
    get buffer() : WebGLBuffer | undefined { return this._buffer; }
    // Public set accessor to private properties.
    // Should toggle isDirty flag to true.
    set data(data: TypedArray) {
        this._data = data;
        this._isDirty = true;
    }
    set size(size: number) {
        this._size = size;
        this._isDirty = true;
    }
    set dtype(dtype: number) {
        this._dtype = dtype;
        this._isDirty = true;
    }
    set normalize(normalize: boolean) {
        this._normalize = normalize;
        this._isDirty = true;
    }
    set stride(stride: number) {
        this._stride = stride;
        this._isDirty = true;
    }
    set offset(offset: number) {
        this._offset = offset;
        this._isDirty = true;
    }
    set buffer(buffer: WebGLBuffer) {
        this._buffer = buffer;
        this._isDirty = true;
    }


    /**
     * Tandai buffer sebagai bersih
     * (tidak perlu di-copy kembali ke GPU)
     *
     * Hanya dipanggil pada attribute setter.
     */
    consume() {
        this._isDirty = false;
    }


    /**
     * Jumlah elemen dalam buffer (elemen = data.length / size).
     */
    get count() {
        return this._data.length / this._size;
    }


    /**
     * Panjang dari buffer (data.length = elemen * size).
     */
    get length() {
        return this._data.length;
    }


    set(index: number, data: number[]) {
        this._isDirty = true;
        // Set elemen[index] dengan data (data.length == this._size)
        // Jangan lupa untuk menyesuaikan dengan offset dan stride.
        const start = index * this._size + this._offset;
        for (let i = 0; i < this._size; i++) {
            this._data[start + i] = data[i];
        }
        this.offset += this.stride;
    }


    get(index: number, size?: number) {
        index *= this._size;
        if (!size) size = this._size;
        const data: number[] = [];
        // Ambil elemen[index] ke data (data.length == size)
        // Jangan lupa untuk menyesuaikan dengan offset dan stride.
        const start = index + this._offset;
        for (let i = 0; i < size; i++) {
            data.push(this._data[start + i]);
        }
        return data;
    }
}

// const attr = new BufferAttribute(new Float32Array([
//     -2,  2, // A
//     -2, -2, // B
//      2, -2, // C
//      2, -2, // C
//      2,  2, // D
//     -2,  2, // A
// ]), 2);
// attr.count; // 6: A, B, C, C, D, A
// attr.length; // 12
// attr.set(0, [-2, 0]); // set vertex 0 jadi (-2, 0)
// attr.get(0); // [ -2, 0 ]
