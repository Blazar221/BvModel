import {LineSegmentsGeometry} from "three/examples/jsm/lines/LineSegmentsGeometry";

/**
 * CHANGE DEFAULT CONTINUOUS LINE TO DISCRETE LINE
 * In the default version, the line segment will treat the input points as the continuous
 * coordinate along a complete line segment, and it will transform it into many pairs, connecting
 * the two points which is incident. But in our implementation, the input points already represent
 * those pairs, and it is likely that they are several discrete lines, instead of one line segment.
 * So we just delete the transformation code in the default version.
 */
export class LineGeometry extends LineSegmentsGeometry {

    constructor() {

        super();
        this.type = 'LineGeometry';

    }

    setPositions(array) {

        super.setPositions(array);
        return this;

    }

    setColors(array) {

        super.setColors(array);
        return this;

    }

    fromLine(line) {

        var geometry = line.geometry;

        if (geometry.isGeometry) {

            console.error('THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.');
            return;

        } else if (geometry.isBufferGeometry) {

            this.setPositions(geometry.attributes.position.array); // assumes non-indexed

        } // set colors, maybe

        return this;

    }

}

