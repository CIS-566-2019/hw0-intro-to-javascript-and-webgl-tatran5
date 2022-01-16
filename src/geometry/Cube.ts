import { vec3, vec4 } from "gl-matrix";
import Drawable from "../rendering/gl/Drawable";
import {gl} from '../globals';

export class Cube extends Drawable {
	indices: Uint32Array;
	positions: Float32Array;
	normals: Float32Array;
	center: vec4; // QUESTION: keep or not?

	constructor(center: vec3) {
		super();
		this.center = vec4.fromValues(center[0], center[1], center[2], 1);
	}

	populatePos() {
		this.positions = new Float32Array([
			// Front quad.
			-1, -1, 1, 1, //0
			-1, 1, 1, 1, //1
			1, 1, 1, 1, //2
			1, -1, 1, 1, //3
			// Back quad.
			-1, 1, -1, 1, //4
			1, 1, -1, 1, //5
			1, -1, -1, 1, //6
			-1, -1, -1, 1, //7
			// Right quad.
			1, -1, -1, 1, //8
			1, -1, 1, 1, //9
			1, 1, 1, 1, //10
			1, 1, -1, 1, //11
			// Left quad.
			-1, -1, -1, 1, //12
			-1, -1, 1, 1, //13
			-1, 1, 1, 1, //14
			-1, 1, -1, 1, //15
			// Top quad.
			-1, 1, -1, 1, //16
			1, 1, -1, 1, //17
			1, 1, 1, 1, //18
			-1, 1, 1, 1, //19
			// Bottom quad.
			-1, -1, -1, 1, //20
			1, -1, -1, 1, //21
			1, -1, 1, 1, //22
			-1, -1, 1, 1 //23
		])
	}

	populateNor() {
		this.normals = new Float32Array([
			// Front quad.
			0, 0, 1, 0, 
			0, 0, 1, 0,
			0, 0, 1, 0,
			0, 0, 1, 0,
			// Back quad.
			0, 0, -1, 0, 
			0, 0, -1, 0,
			0, 0, -1, 0,
			0, 0, -1, 0,
			// Right quad.
			1, 0, 0, 0,
			1, 0, 0, 0,
			1, 0, 0, 0,
			1, 0, 0, 0,
			// Left quad.
			-1, 0, 0, 0,
			-1, 0, 0, 0,
			-1, 0, 0, 0,
			-1, 0, 0, 0,
			// Top quad.
			0, 1, 0, 0,
			0, 1, 0, 0,
			0, 1, 0, 0,
			0, 1, 0, 0,
			// Bottom quad.
			0, -1, 0, 0,
			0, -1, 0, 0,
			0, -1, 0, 0,
			0, -1, 0, 0
		])
	}

	populateIdx() {
		this.indices = new Uint32Array([
			0, 1, 2, 0, 2, 3, // Front quad's triangles.
			4, 5, 6, 4, 6, 7, // Back quad's triangles.
			8, 9, 10, 8, 10, 11, // Right quad's triangles.
			12, 13, 14, 12, 14, 15, // Left quad's triangles.
			16, 17, 18, 16, 18, 19, // Top quad's triangles.
			20, 21, 22, 20, 22, 23]); // Bottom quad's triangles.
	}

	create() {
		this.populateIdx();
		this.populatePos();
		this.populateNor();

		this.generateIdx();
    this.generatePos();
    this.generateNor();

		this.count = this.indices.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

    console.log(`Created cube`);
	}
}