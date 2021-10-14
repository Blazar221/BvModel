import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'

/**
 * Modify LineGeometry to merge discrete line
 * Note: Discrete line can also be implemented by setting Width array as
 * [width0, 0, width1, 0... ] to original LineGeometry
 * @author: Blazar
 */

var LineGeometry = function() {
  LineSegmentsGeometry.call(this)

  this.type = 'LineGeometry'
}

LineGeometry.prototype = Object.assign(Object.create(LineSegmentsGeometry.prototype), {

  constructor: LineGeometry,

  isLineGeometry: true,

  setPositions: function(array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format

    /*    var length = array.length - 3;
    var points = new Float32Array( 2 * length );

    for ( var i = 0; i < length; i += 3 ) {

      points[ 2 * i ] = array[ i ];
      points[ 2 * i + 1 ] = array[ i + 1 ];
      points[ 2 * i + 2 ] = array[ i + 2 ];

      points[ 2 * i + 3 ] = array[ i + 3 ];
      points[ 2 * i + 4 ] = array[ i + 4 ];
      points[ 2 * i + 5 ] = array[ i + 5 ];

    }

    LineSegmentsGeometry.prototype.setPositions.call( this, points );*/

    // change from continuous line to discrete line

    LineSegmentsGeometry.prototype.setPositions.call(this, array)

    return this
  },

  setColors: function(array) {
    // converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format

    /* var length = array.length - 3;
    var colors = new Float32Array( 2 * length );

    for ( var i = 0; i < length; i += 3 ) {

      colors[ 2 * i ] = array[ i ];
      colors[ 2 * i + 1 ] = array[ i + 1 ];
      colors[ 2 * i + 2 ] = array[ i + 2 ];

      colors[ 2 * i + 3 ] = array[ i + 3 ];
      colors[ 2 * i + 4 ] = array[ i + 4 ];
      colors[ 2 * i + 5 ] = array[ i + 5 ];

    }

    LineSegmentsGeometry.prototype.setColors.call( this, colors );*/

    LineSegmentsGeometry.prototype.setColors.call(this, array)

    return this
  },

  fromLine: function(line) {
    var geometry = line.geometry

    if (geometry.isGeometry) {
      console.error('THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.')
      return
    } else if (geometry.isBufferGeometry) {
      this.setPositions(geometry.attributes.position.array) // assumes non-indexed
    }

    // set colors, maybe

    return this
  },

  copy: function(/* source */) {
    // todo

    return this
  }

})

export { LineGeometry }
