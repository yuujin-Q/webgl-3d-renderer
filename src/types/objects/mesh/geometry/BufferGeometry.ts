/* eslint-disable @typescript-eslint/no-explicit-any */
import {BufferAttribute} from './BufferAttribute';

export class BufferGeometry {
    private _attributes: {[name: string]: BufferAttribute};
    private _indices?: BufferAttribute;


    constructor() {
        this._attributes = {};
    }


    get attributes() {
        return this._attributes;
    }


    get indices() {
        return this._indices;
    }

    static fromJSON(json: any): BufferGeometry {
        const geometry = new BufferGeometry();
        for (const name in json.attributes) {
            geometry.setAttribute(name, BufferAttribute.fromJSON(json.attributes[name]));
        }
        if (json.indices) {
            geometry.setIndices(BufferAttribute.fromJSON(json.indices));
        }
        return geometry;
    }

    static toJSON(geometry: BufferGeometry): object {
        const json: any = {attributes: {}};
        for (const name in geometry.attributes) {
            json.attributes[name] = BufferAttribute.toJSON(geometry.attributes[name]);
        }
        if (geometry.indices) {
            json.indices = BufferAttribute.toJSON(geometry.indices);
        }
        return json;
    }

    setIndices(indices: BufferAttribute) {
        this._indices = indices;
        return this;
    }


    removeIndices() {
        this._indices = undefined;
        return this;
    }


    setAttribute(name: string, attribute: BufferAttribute) {
        this._attributes[name] = attribute;
        return this;
    }


    getAttribute(name: string) {
        return this._attributes[name];
    }


    deleteAttribute(name: string) {
        delete this._attributes[name];
        return this;
    }


    calculateNormals(forceNewAttribute=false) {
        const position = this.getAttribute('a_position');
        if (!position) return;
        let normal = this.getAttribute('a_normal');
        if (forceNewAttribute || !normal)
            normal = new BufferAttribute(new Float32Array(position.length), position.size);
        else
            normal.data.fill(0); // Reset normal data to 0.
        // Lakukan kalkulasi normal disini.

        const indices = this.indices?.data;
        const indexCount = indices ? indices.length : position.count;
        const posData = position.data;
        const normData = normal.data;

        for (let i = 0; i < indexCount; i += 3) {
            // Ambil index dari vertex A, B, dan C.
            const a = indices ? indices[i] : i;
            const b = indices ? indices[i + 1] : i + 1;
            const c = indices ? indices[i + 2] : i + 2;

            // Ambil posisi dari vertex A, B, dan C.
            const p0 = posData.slice(a * 3, a * 3 + 3);
            const p1 = posData.slice(b * 3, b * 3 + 3);
            const p2 = posData.slice(c * 3, c * 3 + 3);
            
            // Hitung vektor normal dari segitiga ABC.
            const u = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
            const v = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]];

            const n = [
                u[1] * v[2] - u[2] * v[1],
                u[2] * v[0] - u[0] * v[2],
                u[0] * v[1] - u[1] * v[0]
            ];

            normData[a * 3] += n[0];
            normData[a * 3 + 1] += n[1];
            normData[a * 3 + 2] += n[2];

            normData[b * 3] += n[0];
            normData[b * 3 + 1] += n[1];
            normData[b * 3 + 2] += n[2];

            normData[c * 3] += n[0];
            normData[c * 3 + 1] += n[1];
            normData[c * 3 + 2] += n[2];
        }

        // Normalisasi vektor normal.
        for (let i = 0; i < normData.length; i += 3) {
            const x = normData[i];
            const y = normData[i + 1];
            const z = normData[i + 2];
            
            const length = Math.sqrt(x * x + y * y + z * z);
            if (length === 0) continue;

            normData[i] /= length;
            normData[i + 1] /= length;
            normData[i + 2] /= length;
        }
        this.setAttribute('a_normal', normal);
        return this;
    }
}