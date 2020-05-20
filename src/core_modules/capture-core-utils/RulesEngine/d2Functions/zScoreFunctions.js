const maleCodes = { male: 1, MALE: 1, Male: 1, ma: 1, m: 1, M: 1, 0: 1, false: 1 };
// command to produce the body of the map:
// curl https://www.who.int/childgrowth/standards/wfa_girls_0_5_zscores.txt | awk  '{print $1 ": [ " $5 ", " $6 ", " $7 ", " $8 ", " $9 ", " $10 ", " ($11+0) " ]," }'
const femaleMapWFA = {
    0: [2.0, 2.4, 2.8, 3.2, 3.7, 4.2, 4.8],
    1: [2.7, 3.2, 3.6, 4.2, 4.8, 5.5, 6.2],
    2: [3.4, 3.9, 4.5, 5.1, 5.8, 6.6, 7.5],
    3: [4.0, 4.5, 5.2, 5.8, 6.6, 7.5, 8.5],
    4: [4.4, 5.0, 5.7, 6.4, 7.3, 8.2, 9.3],
    5: [4.8, 5.4, 6.1, 6.9, 7.8, 8.8, 10],
    6: [5.1, 5.7, 6.5, 7.3, 8.2, 9.3, 10.6],
    7: [5.3, 6.0, 6.8, 7.6, 8.6, 9.8, 11.1],
    8: [5.6, 6.3, 7.0, 7.9, 9.0, 10.2, 11.6],
    9: [5.8, 6.5, 7.3, 8.2, 9.3, 10.5, 12],
    10: [5.9, 6.7, 7.5, 8.5, 9.6, 10.9, 12.4],
    11: [6.1, 6.9, 7.7, 8.7, 9.9, 11.2, 12.8],
    12: [6.3, 7.0, 7.9, 8.9, 10.1, 11.5, 13.1],
    13: [6.4, 7.2, 8.1, 9.2, 10.4, 11.8, 13.5],
    14: [6.6, 7.4, 8.3, 9.4, 10.6, 12.1, 13.8],
    15: [6.7, 7.6, 8.5, 9.6, 10.9, 12.4, 14.1],
    16: [6.9, 7.7, 8.7, 9.8, 11.1, 12.6, 14.5],
    17: [7.0, 7.9, 8.9, 10.0, 11.4, 12.9, 14.8],
    18: [7.2, 8.1, 9.1, 10.2, 11.6, 13.2, 15.1],
    19: [7.3, 8.2, 9.2, 10.4, 11.8, 13.5, 15.4],
    20: [7.5, 8.4, 9.4, 10.6, 12.1, 13.7, 15.7],
    21: [7.6, 8.6, 9.6, 10.9, 12.3, 14.0, 16],
    22: [7.8, 8.7, 9.8, 11.1, 12.5, 14.3, 16.4],
    23: [7.9, 8.9, 10.0, 11.3, 12.8, 14.6, 16.7],
    24: [8.1, 9.0, 10.2, 11.5, 13.0, 14.8, 17],
    25: [8.2, 9.2, 10.3, 11.7, 13.3, 15.1, 17.3],
    26: [8.4, 9.4, 10.5, 11.9, 13.5, 15.4, 17.7],
    27: [8.5, 9.5, 10.7, 12.1, 13.7, 15.7, 18],
    28: [8.6, 9.7, 10.9, 12.3, 14.0, 16.0, 18.3],
    29: [8.8, 9.8, 11.1, 12.5, 14.2, 16.2, 18.7],
    30: [8.9, 10.0, 11.2, 12.7, 14.4, 16.5, 19],
    31: [9.0, 10.1, 11.4, 12.9, 14.7, 16.8, 19.3],
    32: [9.1, 10.3, 11.6, 13.1, 14.9, 17.1, 19.6],
    33: [9.3, 10.4, 11.7, 13.3, 15.1, 17.3, 20],
    34: [9.4, 10.5, 11.9, 13.5, 15.4, 17.6, 20.3],
    35: [9.5, 10.7, 12.0, 13.7, 15.6, 17.9, 20.6],
    36: [9.6, 10.8, 12.2, 13.9, 15.8, 18.1, 20.9],
    37: [9.7, 10.9, 12.4, 14.0, 16.0, 18.4, 21.3],
    38: [9.8, 11.1, 12.5, 14.2, 16.3, 18.7, 21.6],
    39: [9.9, 11.2, 12.7, 14.4, 16.5, 19.0, 22],
    40: [10.1, 11.3, 12.8, 14.6, 16.7, 19.2, 22.3],
    41: [10.2, 11.5, 13.0, 14.8, 16.9, 19.5, 22.7],
    42: [10.3, 11.6, 13.1, 15.0, 17.2, 19.8, 23],
    43: [10.4, 11.7, 13.3, 15.2, 17.4, 20.1, 23.4],
    44: [10.5, 11.8, 13.4, 15.3, 17.6, 20.4, 23.7],
    45: [10.6, 12.0, 13.6, 15.5, 17.8, 20.7, 24.1],
    46: [10.7, 12.1, 13.7, 15.7, 18.1, 20.9, 24.5],
    47: [10.8, 12.2, 13.9, 15.9, 18.3, 21.2, 24.8],
    48: [10.9, 12.3, 14.0, 16.1, 18.5, 21.5, 25.2],
    49: [11.0, 12.4, 14.2, 16.3, 18.8, 21.8, 25.5],
    50: [11.1, 12.6, 14.3, 16.4, 19.0, 22.1, 25.9],
    51: [11.2, 12.7, 14.5, 16.6, 19.2, 22.4, 26.3],
    52: [11.3, 12.8, 14.6, 16.8, 19.4, 22.6, 26.6],
    53: [11.4, 12.9, 14.8, 17.0, 19.7, 22.9, 27],
    54: [11.5, 13.0, 14.9, 17.2, 19.9, 23.2, 27.4],
    55: [11.6, 13.2, 15.1, 17.3, 20.1, 23.5, 27.7],
    56: [11.7, 13.3, 15.2, 17.5, 20.3, 23.8, 28.1],
    57: [11.8, 13.4, 15.3, 17.7, 20.6, 24.1, 28.5],
    58: [11.9, 13.5, 15.5, 17.9, 20.8, 24.4, 28.8],
    59: [12.0, 13.6, 15.6, 18.0, 21.0, 24.6, 29.2],
    60: [12.1, 13.7, 15.8, 18.2, 21.2, 24.9, 29.5],
};

// command to produce the body of the map:
// curl https://www.who.int/childgrowth/standards/wfa_boys_0_5_zscores.txt | awk  '{print $1 ": [ " $5 ", " $6 ", " $7 ", " $8 ", " $9 ", " $10 ", " ($11+0) " ]," }'
const maleMapWFA = {
    0: [2.1, 2.5, 2.9, 3.3, 3.9, 4.4, 5],
    1: [2.9, 3.4, 3.9, 4.5, 5.1, 5.8, 6.6],
    2: [3.8, 4.3, 4.9, 5.6, 6.3, 7.1, 8],
    3: [4.4, 5.0, 5.7, 6.4, 7.2, 8.0, 9],
    4: [4.9, 5.6, 6.2, 7.0, 7.8, 8.7, 9.7],
    5: [5.3, 6.0, 6.7, 7.5, 8.4, 9.3, 10.4],
    6: [5.7, 6.4, 7.1, 7.9, 8.8, 9.8, 10.9],
    7: [5.9, 6.7, 7.4, 8.3, 9.2, 10.3, 11.4],
    8: [6.2, 6.9, 7.7, 8.6, 9.6, 10.7, 11.9],
    9: [6.4, 7.1, 8.0, 8.9, 9.9, 11.0, 12.3],
    10: [6.6, 7.4, 8.2, 9.2, 10.2, 11.4, 12.7],
    11: [6.8, 7.6, 8.4, 9.4, 10.5, 11.7, 13],
    12: [6.9, 7.7, 8.6, 9.6, 10.8, 12.0, 13.3],
    13: [7.1, 7.9, 8.8, 9.9, 11.0, 12.3, 13.7],
    14: [7.2, 8.1, 9.0, 10.1, 11.3, 12.6, 14],
    15: [7.4, 8.3, 9.2, 10.3, 11.5, 12.8, 14.3],
    16: [7.5, 8.4, 9.4, 10.5, 11.7, 13.1, 14.6],
    17: [7.7, 8.6, 9.6, 10.7, 12.0, 13.4, 14.9],
    18: [7.8, 8.8, 9.8, 10.9, 12.2, 13.7, 15.3],
    19: [8.0, 8.9, 10.0, 11.1, 12.5, 13.9, 15.6],
    20: [8.1, 9.1, 10.1, 11.3, 12.7, 14.2, 15.9],
    21: [8.2, 9.2, 10.3, 11.5, 12.9, 14.5, 16.2],
    22: [8.4, 9.4, 10.5, 11.8, 13.2, 14.7, 16.5],
    23: [8.5, 9.5, 10.7, 12.0, 13.4, 15.0, 16.8],
    24: [8.6, 9.7, 10.8, 12.2, 13.6, 15.3, 17.1],
    25: [8.8, 9.8, 11.0, 12.4, 13.9, 15.5, 17.5],
    26: [8.9, 10.0, 11.2, 12.5, 14.1, 15.8, 17.8],
    27: [9.0, 10.1, 11.3, 12.7, 14.3, 16.1, 18.1],
    28: [9.1, 10.2, 11.5, 12.9, 14.5, 16.3, 18.4],
    29: [9.2, 10.4, 11.7, 13.1, 14.8, 16.6, 18.7],
    30: [9.4, 10.5, 11.8, 13.3, 15.0, 16.9, 19],
    31: [9.5, 10.7, 12.0, 13.5, 15.2, 17.1, 19.3],
    32: [9.6, 10.8, 12.1, 13.7, 15.4, 17.4, 19.6],
    33: [9.7, 10.9, 12.3, 13.8, 15.6, 17.6, 19.9],
    34: [9.8, 11.0, 12.4, 14.0, 15.8, 17.8, 20.2],
    35: [9.9, 11.2, 12.6, 14.2, 16.0, 18.1, 20.4],
    36: [10.0, 11.3, 12.7, 14.3, 16.2, 18.3, 20.7],
    37: [10.1, 11.4, 12.9, 14.5, 16.4, 18.6, 21],
    38: [10.2, 11.5, 13.0, 14.7, 16.6, 18.8, 21.3],
    39: [10.3, 11.6, 13.1, 14.8, 16.8, 19.0, 21.6],
    40: [10.4, 11.8, 13.3, 15.0, 17.0, 19.3, 21.9],
    41: [10.5, 11.9, 13.4, 15.2, 17.2, 19.5, 22.1],
    42: [10.6, 12.0, 13.6, 15.3, 17.4, 19.7, 22.4],
    43: [10.7, 12.1, 13.7, 15.5, 17.6, 20.0, 22.7],
    44: [10.8, 12.2, 13.8, 15.7, 17.8, 20.2, 23],
    45: [10.9, 12.4, 14.0, 15.8, 18.0, 20.5, 23.3],
    46: [11.0, 12.5, 14.1, 16.0, 18.2, 20.7, 23.6],
    47: [11.1, 12.6, 14.3, 16.2, 18.4, 20.9, 23.9],
    48: [11.2, 12.7, 14.4, 16.3, 18.6, 21.2, 24.2],
    49: [11.3, 12.8, 14.5, 16.5, 18.8, 21.4, 24.5],
    50: [11.4, 12.9, 14.7, 16.7, 19.0, 21.7, 24.8],
    51: [11.5, 13.1, 14.8, 16.8, 19.2, 21.9, 25.1],
    52: [11.6, 13.2, 15.0, 17.0, 19.4, 22.2, 25.4],
    53: [11.7, 13.3, 15.1, 17.2, 19.6, 22.4, 25.7],
    54: [11.8, 13.4, 15.2, 17.3, 19.8, 22.7, 26],
    55: [11.9, 13.5, 15.4, 17.5, 20.0, 22.9, 26.3],
    56: [12.0, 13.6, 15.5, 17.7, 20.2, 23.2, 26.6],
    57: [12.1, 13.7, 15.6, 17.8, 20.4, 23.4, 26.9],
    58: [12.2, 13.8, 15.8, 18.0, 20.6, 23.7, 27.2],
    59: [12.3, 14.0, 15.9, 18.2, 20.8, 23.9, 27.6],
    60: [12.4, 14.1, 16.0, 18.3, 21.0, 24.2, 27.9],
};

// Combine these two commands to produce the list below.
// curl https://www.who.int/childgrowth/standards/wfl_girls_z_exp.txt | awk  '{print $1 ": [ " $3 ", " $4 ", " $5 ", " $6 ", " $7 ", " $8 ", " ($9+0) " ]," }' | egrep '^(([0-7][0-9])|([8][0-6]))\.[05]'
// curl https://www.who.int/childgrowth/standards/wfh_girls_z_exp.txt | awk  '{print $1 ": [ " $3 ", " $4 ", " $5 ", " $6 ", " $7 ", " $8 ", " ($9+0) " ]," }' | egrep '^(([8][7-9])|([9][0-9])|[0-9]{3})\.[05]'
const femaleMapWFH = {
    45.0: [1.902, 2.066, 2.252, 2.461, 2.698, 2.967, 3.275],
    45.5: [1.967, 2.138, 2.329, 2.546, 2.791, 3.070, 3.389],
    46.0: [2.033, 2.209, 2.407, 2.631, 2.884, 3.172, 3.502],
    46.5: [2.098, 2.280, 2.485, 2.716, 2.977, 3.275, 3.616],
    47.0: [2.164, 2.351, 2.562, 2.801, 3.071, 3.378, 3.73],
    47.5: [2.230, 2.423, 2.641, 2.887, 3.165, 3.482, 3.845],
    48.0: [2.297, 2.497, 2.721, 2.974, 3.261, 3.588, 3.962],
    48.5: [2.366, 2.571, 2.803, 3.064, 3.359, 3.696, 4.082],
    49.0: [2.437, 2.649, 2.887, 3.156, 3.461, 3.808, 4.205],
    49.5: [2.511, 2.729, 2.975, 3.252, 3.566, 3.924, 4.334],
    50.0: [2.588, 2.813, 3.066, 3.352, 3.676, 4.045, 4.467],
    50.5: [2.668, 2.900, 3.161, 3.456, 3.790, 4.171, 4.606],
    51.0: [2.750, 2.990, 3.259, 3.564, 3.908, 4.301, 4.751],
    51.5: [2.836, 3.084, 3.362, 3.675, 4.031, 4.437, 4.901],
    52.0: [2.925, 3.180, 3.467, 3.791, 4.158, 4.577, 5.056],
    52.5: [3.017, 3.280, 3.576, 3.910, 4.290, 4.721, 5.216],
    53.0: [3.112, 3.383, 3.688, 4.033, 4.424, 4.870, 5.38],
    53.5: [3.208, 3.488, 3.803, 4.159, 4.563, 5.022, 5.549],
    54.0: [3.307, 3.596, 3.921, 4.288, 4.704, 5.178, 5.721],
    54.5: [3.407, 3.705, 4.040, 4.418, 4.847, 5.336, 5.896],
    55.0: [3.508, 3.815, 4.160, 4.550, 4.992, 5.496, 6.073],
    55.5: [3.611, 3.926, 4.281, 4.683, 5.138, 5.657, 6.251],
    56.0: [3.713, 4.038, 4.403, 4.816, 5.285, 5.818, 6.43],
    56.5: [3.816, 4.150, 4.526, 4.950, 5.432, 5.980, 6.609],
    57.0: [3.919, 4.262, 4.648, 5.084, 5.579, 6.143, 6.789],
    57.5: [4.021, 4.373, 4.770, 5.217, 5.725, 6.304, 6.968],
    58.0: [4.124, 4.485, 4.891, 5.351, 5.872, 6.466, 7.146],
    58.5: [4.226, 4.596, 5.013, 5.483, 6.018, 6.626, 7.324],
    59.0: [4.327, 4.706, 5.133, 5.615, 6.162, 6.786, 7.5],
    59.5: [4.427, 4.815, 5.252, 5.745, 6.305, 6.944, 7.675],
    60.0: [4.527, 4.923, 5.370, 5.874, 6.447, 7.099, 7.847],
    60.5: [4.624, 5.030, 5.486, 6.001, 6.586, 7.253, 8.017],
    61.0: [4.721, 5.135, 5.601, 6.127, 6.724, 7.405, 8.185],
    61.5: [4.817, 5.239, 5.714, 6.251, 6.860, 7.555, 8.351],
    62.0: [4.912, 5.342, 5.826, 6.374, 6.995, 7.703, 8.514],
    62.5: [5.005, 5.444, 5.937, 6.495, 7.128, 7.849, 8.675],
    63.0: [5.098, 5.544, 6.047, 6.614, 7.259, 7.993, 8.834],
    63.5: [5.189, 5.644, 6.155, 6.733, 7.388, 8.136, 8.992],
    64.0: [5.280, 5.742, 6.262, 6.850, 7.517, 8.277, 9.148],
    64.5: [5.370, 5.840, 6.369, 6.966, 7.644, 8.417, 9.302],
    65.0: [5.459, 5.937, 6.474, 7.081, 7.770, 8.555, 9.454],
    65.5: [5.547, 6.033, 6.578, 7.195, 7.895, 8.692, 9.605],
    66.0: [5.635, 6.128, 6.682, 7.308, 8.018, 8.827, 9.753],
    66.5: [5.721, 6.221, 6.784, 7.419, 8.139, 8.960, 9.901],
    67.0: [5.807, 6.314, 6.885, 7.529, 8.260, 9.092, 10.046],
    67.5: [5.892, 6.406, 6.984, 7.638, 8.378, 9.222, 10.189],
    68.0: [5.975, 6.497, 7.083, 7.745, 8.496, 9.351, 10.33],
    68.5: [6.058, 6.586, 7.180, 7.851, 8.611, 9.478, 10.47],
    69.0: [6.140, 6.675, 7.277, 7.956, 8.726, 9.603, 10.608],
    69.5: [6.221, 6.763, 7.372, 8.060, 8.840, 9.728, 10.745],
    70.0: [6.302, 6.850, 7.467, 8.163, 8.952, 9.851, 10.88],
    70.5: [6.382, 6.937, 7.561, 8.265, 9.064, 9.973, 11.014],
    71.0: [6.461, 7.023, 7.654, 8.367, 9.174, 10.094, 11.147],
    71.5: [6.540, 7.108, 7.747, 8.468, 9.285, 10.215, 11.279],
    72.0: [6.619, 7.193, 7.839, 8.568, 9.394, 10.334, 11.41],
    72.5: [6.697, 7.278, 7.931, 8.667, 9.502, 10.453, 11.54],
    73.0: [6.774, 7.361, 8.021, 8.766, 9.610, 10.571, 11.669],
    73.5: [6.851, 7.444, 8.111, 8.864, 9.716, 10.687, 11.797],
    74.0: [6.927, 7.526, 8.200, 8.960, 9.821, 10.801, 11.922],
    74.5: [7.001, 7.607, 8.287, 9.055, 9.925, 10.915, 12.046],
    75.0: [7.075, 7.687, 8.374, 9.149, 10.027, 11.026, 12.168],
    75.5: [7.148, 7.766, 8.459, 9.242, 10.128, 11.136, 12.289],
    76.0: [7.221, 7.844, 8.544, 9.334, 10.228, 11.246, 12.408],
    76.5: [7.293, 7.922, 8.628, 9.425, 10.328, 11.354, 12.527],
    77.0: [7.365, 7.999, 8.712, 9.517, 10.427, 11.463, 12.646],
    77.5: [7.437, 8.078, 8.797, 9.609, 10.527, 11.572, 12.765],
    78.0: [7.511, 8.157, 8.883, 9.702, 10.628, 11.682, 12.886],
    78.5: [7.585, 8.237, 8.970, 9.796, 10.731, 11.794, 13.008],
    79.0: [7.660, 8.319, 9.058, 9.892, 10.835, 11.907, 13.132],
    79.5: [7.737, 8.402, 9.148, 9.989, 10.941, 12.023, 13.26],
    80.0: [7.816, 8.487, 9.240, 10.089, 11.050, 12.142, 13.389],
    80.5: [7.897, 8.574, 9.335, 10.192, 11.161, 12.264, 13.523],
    81.0: [7.979, 8.663, 9.431, 10.296, 11.276, 12.388, 13.659],
    81.5: [8.064, 8.755, 9.530, 10.404, 11.393, 12.517, 13.8],
    82.0: [8.150, 8.848, 9.631, 10.514, 11.513, 12.647, 13.943],
    82.5: [8.238, 8.943, 9.735, 10.626, 11.635, 12.781, 14.09],
    83.0: [8.328, 9.040, 9.840, 10.741, 11.760, 12.918, 14.24],
    83.5: [8.419, 9.139, 9.947, 10.858, 11.888, 13.058, 14.393],
    84.0: [8.512, 9.240, 10.057, 10.977, 12.017, 13.200, 14.549],
    84.5: [8.606, 9.342, 10.167, 11.097, 12.149, 13.344, 14.708],
    85.0: [8.702, 9.445, 10.280, 11.220, 12.283, 13.491, 14.869],
    85.5: [8.798, 9.550, 10.393, 11.344, 12.418, 13.639, 15.033],
    86.0: [8.895, 9.655, 10.508, 11.468, 12.555, 13.789, 15.197],
    86.5: [8.993, 9.761, 10.623, 11.594, 12.692, 13.940, 15.363],
    87.0: [9.227, 10.015, 10.900, 11.896, 13.024, 14.304, 15.765],
    87.5: [9.324, 10.121, 11.015, 12.022, 13.161, 14.455, 15.932],
    88.0: [9.421, 10.226, 11.130, 12.148, 13.299, 14.607, 16.099],
    88.5: [9.518, 10.331, 11.244, 12.273, 13.436, 14.758, 16.266],
    89.0: [9.614, 10.436, 11.358, 12.398, 13.573, 14.909, 16.433],
    89.5: [9.709, 10.540, 11.472, 12.522, 13.710, 15.059, 16.6],
    90.0: [9.805, 10.644, 11.585, 12.646, 13.846, 15.210, 16.767],
    90.5: [9.900, 10.747, 11.698, 12.770, 13.983, 15.360, 16.933],
    91.0: [9.994, 10.850, 11.811, 12.894, 14.119, 15.511, 17.1],
    91.5: [10.089, 10.953, 11.924, 13.018, 14.255, 15.662, 17.267],
    92.0: [10.183, 11.056, 12.037, 13.142, 14.392, 15.813, 17.435],
    92.5: [10.277, 11.159, 12.149, 13.265, 14.528, 15.964, 17.603],
    93.0: [10.372, 11.262, 12.262, 13.390, 14.665, 16.116, 17.772],
    93.5: [10.466, 11.366, 12.376, 13.514, 14.803, 16.268, 17.942],
    94.0: [10.561, 11.469, 12.489, 13.639, 14.941, 16.421, 18.112],
    94.5: [10.656, 11.573, 12.603, 13.765, 15.080, 16.576, 18.284],
    95.0: [10.751, 11.678, 12.718, 13.891, 15.220, 16.731, 18.457],
    95.5: [10.847, 11.783, 12.833, 14.019, 15.361, 16.887, 18.632],
    96.0: [10.943, 11.888, 12.949, 14.147, 15.502, 17.045, 18.808],
    96.5: [11.040, 11.994, 13.066, 14.276, 15.646, 17.204, 18.986],
    97.0: [11.137, 12.101, 13.184, 14.406, 15.790, 17.365, 19.166],
    97.5: [11.236, 12.209, 13.303, 14.538, 15.936, 17.528, 19.349],
    98.0: [11.336, 12.319, 13.424, 14.671, 16.084, 17.693, 19.533],
    98.5: [11.436, 12.429, 13.546, 14.806, 16.235, 17.861, 19.721],
    99.0: [11.538, 12.542, 13.670, 14.943, 16.387, 18.031, 19.913],
    99.5: [11.642, 12.655, 13.796, 15.083, 16.542, 18.205, 20.107],
    100.0: [11.747, 12.771, 13.924, 15.225, 16.700, 18.381, 20.305],
    100.5: [11.854, 12.889, 14.053, 15.369, 16.861, 18.561, 20.507],
    101.0: [11.962, 13.008, 14.186, 15.515, 17.024, 18.743, 20.712],
    101.5: [12.072, 13.130, 14.320, 15.665, 17.190, 18.930, 20.922],
    102.0: [12.184, 13.253, 14.457, 15.816, 17.360, 19.119, 21.136],
    102.5: [12.298, 13.379, 14.596, 15.971, 17.532, 19.312, 21.352],
    103.0: [12.414, 13.506, 14.737, 16.128, 17.707, 19.508, 21.574],
    103.5: [12.531, 13.636, 14.880, 16.287, 17.885, 19.708, 21.799],
    104.0: [12.650, 13.767, 15.026, 16.449, 18.066, 19.911, 22.027],
    104.5: [12.770, 13.900, 15.173, 16.613, 18.249, 20.117, 22.26],
    105.0: [12.893, 14.035, 15.323, 16.780, 18.436, 20.326, 22.496],
    105.5: [13.017, 14.173, 15.475, 16.950, 18.626, 20.540, 22.737],
    106.0: [13.143, 14.312, 15.630, 17.122, 18.818, 20.756, 22.982],
    106.5: [13.271, 14.454, 15.787, 17.297, 19.015, 20.977, 23.231],
    107.0: [13.401, 14.598, 15.947, 17.476, 19.214, 21.202, 23.485],
    107.5: [13.533, 14.744, 16.110, 17.657, 19.417, 21.430, 23.743],
    108.0: [13.667, 14.892, 16.275, 17.841, 19.623, 21.662, 24.006],
    108.5: [13.803, 15.043, 16.442, 18.028, 19.833, 21.898, 24.273],
    109.0: [13.942, 15.196, 16.612, 18.217, 20.046, 22.138, 24.544],
    109.5: [14.081, 15.351, 16.784, 18.410, 20.261, 22.380, 24.819],
    110.0: [14.223, 15.508, 16.959, 18.604, 20.479, 22.626, 25.098],
    110.5: [14.366, 15.666, 17.135, 18.802, 20.701, 22.876, 25.381],
    111.0: [14.511, 15.827, 17.314, 19.001, 20.924, 23.128, 25.666],
    111.5: [14.657, 15.989, 17.494, 19.202, 21.151, 23.383, 25.956],
    112.0: [14.804, 16.152, 17.676, 19.406, 21.379, 23.642, 26.249],
    112.5: [14.953, 16.317, 17.860, 19.612, 21.610, 23.902, 26.545],
    113.0: [15.103, 16.484, 18.045, 19.819, 21.843, 24.165, 26.843],
    113.5: [15.254, 16.652, 18.232, 20.028, 22.078, 24.430, 27.144],
    114.0: [15.406, 16.820, 18.420, 20.238, 22.315, 24.698, 27.448],
    114.5: [15.559, 16.990, 18.609, 20.450, 22.553, 24.967, 27.754],
    115.0: [15.712, 17.160, 18.799, 20.663, 22.792, 25.238, 28.061],
    115.5: [15.866, 17.331, 18.990, 20.877, 23.033, 25.510, 28.371],
    116.0: [16.021, 17.503, 19.181, 21.091, 23.274, 25.783, 28.681],
    116.5: [16.175, 17.674, 19.373, 21.306, 23.516, 26.057, 28.993],
    117.0: [16.329, 17.846, 19.565, 21.521, 23.759, 26.332, 29.307],
    117.5: [16.484, 18.018, 19.757, 21.737, 24.002, 26.607, 29.621],
    118.0: [16.639, 18.190, 19.950, 21.953, 24.246, 26.883, 29.935],
    118.5: [16.794, 18.363, 20.142, 22.169, 24.489, 27.160, 30.25],
    119.0: [16.948, 18.534, 20.334, 22.385, 24.734, 27.437, 30.567],
    119.5: [17.102, 18.706, 20.527, 22.601, 24.977, 27.714, 30.883],
    120.0: [17.256, 18.878, 20.719, 22.817, 25.222, 27.991, 31.199],
};

// Combine these two commands to produce the list below.
// curl https://www.who.int/childgrowth/standards/wfl_boys_z_exp.txt | awk  '{print $1 ": [ " $3 ", " $4 ", " $5 ", " $6 ", " $7 ", " $8 ", " ($9+0) " ]," }' | egrep '^(([0-7][0-9])|([8][0-6]))\.[05]'
// curl https://www.who.int/childgrowth/standards/wfh_boys_z_exp.txt | awk  '{print $1 ": [ " $3 ", " $4 ", " $5 ", " $6 ", " $7 ", " $8 ", " ($9+0) " ]," }' | egrep '^(([8][7-9])|([9][0-9])|[0-9]{3})\.[05]'
const maleMapWFH = {
    45.0: [1.877, 2.043, 2.230, 2.441, 2.680, 2.951, 3.261],
    45.5: [1.942, 2.114, 2.307, 2.524, 2.771, 3.050, 3.37],
    46.0: [2.008, 2.185, 2.384, 2.608, 2.861, 3.149, 3.477],
    46.5: [2.074, 2.256, 2.461, 2.691, 2.952, 3.248, 3.585],
    47.0: [2.141, 2.328, 2.539, 2.776, 3.043, 3.347, 3.694],
    47.5: [2.208, 2.401, 2.617, 2.861, 3.136, 3.448, 3.804],
    48.0: [2.277, 2.476, 2.698, 2.948, 3.231, 3.551, 3.916],
    48.5: [2.349, 2.552, 2.781, 3.038, 3.328, 3.657, 4.031],
    49.0: [2.422, 2.632, 2.867, 3.131, 3.429, 3.766, 4.151],
    49.5: [2.499, 2.715, 2.956, 3.228, 3.534, 3.881, 4.275],
    50.0: [2.579, 2.801, 3.049, 3.328, 3.642, 3.999, 4.403],
    50.5: [2.661, 2.889, 3.144, 3.431, 3.754, 4.120, 4.536],
    51.0: [2.746, 2.981, 3.243, 3.538, 3.870, 4.245, 4.672],
    51.5: [2.834, 3.075, 3.345, 3.648, 3.989, 4.375, 4.813],
    52.0: [2.925, 3.173, 3.451, 3.762, 4.113, 4.509, 4.958],
    52.5: [3.020, 3.276, 3.561, 3.881, 4.242, 4.649, 5.111],
    53.0: [3.120, 3.383, 3.677, 4.006, 4.377, 4.795, 5.27],
    53.5: [3.223, 3.494, 3.796, 4.135, 4.517, 4.947, 5.434],
    54.0: [3.330, 3.609, 3.921, 4.269, 4.661, 5.104, 5.605],
    54.5: [3.440, 3.727, 4.048, 4.407, 4.810, 5.264, 5.779],
    55.0: [3.553, 3.848, 4.178, 4.547, 4.961, 5.428, 5.957],
    55.5: [3.667, 3.971, 4.310, 4.689, 5.115, 5.595, 6.138],
    56.0: [3.783, 4.095, 4.444, 4.834, 5.271, 5.764, 6.322],
    56.5: [3.900, 4.221, 4.579, 4.980, 5.429, 5.935, 6.506],
    57.0: [4.017, 4.347, 4.715, 5.126, 5.587, 6.106, 6.692],
    57.5: [4.135, 4.474, 4.851, 5.272, 5.745, 6.276, 6.877],
    58.0: [4.252, 4.599, 4.986, 5.418, 5.902, 6.447, 7.061],
    58.5: [4.369, 4.725, 5.121, 5.563, 6.059, 6.616, 7.245],
    59.0: [4.485, 4.849, 5.255, 5.707, 6.214, 6.784, 7.427],
    59.5: [4.600, 4.973, 5.387, 5.850, 6.368, 6.951, 7.607],
    60.0: [4.713, 5.094, 5.518, 5.991, 6.520, 7.115, 7.785],
    60.5: [4.824, 5.213, 5.646, 6.128, 6.669, 7.275, 7.959],
    61.0: [4.932, 5.329, 5.771, 6.263, 6.814, 7.433, 8.13],
    61.5: [5.039, 5.443, 5.893, 6.395, 6.957, 7.587, 8.297],
    62.0: [5.143, 5.555, 6.014, 6.525, 7.097, 7.739, 8.462],
    62.5: [5.245, 5.665, 6.132, 6.653, 7.235, 7.888, 8.624],
    63.0: [5.346, 5.774, 6.249, 6.779, 7.371, 8.035, 8.784],
    63.5: [5.445, 5.880, 6.364, 6.903, 7.505, 8.181, 8.942],
    64.0: [5.544, 5.986, 6.478, 7.026, 7.638, 8.325, 9.098],
    64.5: [5.640, 6.090, 6.590, 7.147, 7.769, 8.467, 9.253],
    65.0: [5.736, 6.193, 6.701, 7.267, 7.899, 8.608, 9.406],
    65.5: [5.830, 6.295, 6.811, 7.385, 8.028, 8.748, 9.558],
    66.0: [5.924, 6.396, 6.920, 7.503, 8.156, 8.887, 9.71],
    66.5: [6.017, 6.496, 7.028, 7.621, 8.283, 9.026, 9.861],
    67.0: [6.109, 6.595, 7.135, 7.737, 8.409, 9.163, 10.011],
    67.5: [6.200, 6.694, 7.242, 7.853, 8.535, 9.300, 10.161],
    68.0: [6.291, 6.791, 7.348, 7.967, 8.660, 9.436, 10.31],
    68.5: [6.380, 6.888, 7.453, 8.082, 8.784, 9.572, 10.459],
    69.0: [6.470, 6.985, 7.558, 8.196, 8.908, 9.708, 10.607],
    69.5: [6.559, 7.081, 7.662, 8.309, 9.032, 9.843, 10.756],
    70.0: [6.647, 7.177, 7.766, 8.423, 9.156, 9.979, 10.905],
    70.5: [6.735, 7.273, 7.870, 8.536, 9.280, 10.114, 11.053],
    71.0: [6.823, 7.368, 7.973, 8.648, 9.402, 10.248, 11.201],
    71.5: [6.909, 7.462, 8.075, 8.759, 9.524, 10.382, 11.348],
    72.0: [6.995, 7.555, 8.177, 8.870, 9.645, 10.514, 11.493],
    72.5: [7.080, 7.647, 8.277, 8.979, 9.764, 10.645, 11.637],
    73.0: [7.163, 7.737, 8.375, 9.086, 9.882, 10.774, 11.78],
    73.5: [7.246, 7.827, 8.473, 9.193, 9.998, 10.902, 11.92],
    74.0: [7.327, 7.915, 8.568, 9.297, 10.113, 11.028, 12.059],
    74.5: [7.407, 8.002, 8.663, 9.401, 10.226, 11.152, 12.195],
    75.0: [7.486, 8.088, 8.757, 9.503, 10.338, 11.275, 12.33],
    75.5: [7.565, 8.173, 8.850, 9.604, 10.448, 11.396, 12.464],
    76.0: [7.641, 8.257, 8.940, 9.703, 10.557, 11.515, 12.595],
    76.5: [7.717, 8.339, 9.030, 9.801, 10.663, 11.632, 12.723],
    77.0: [7.792, 8.420, 9.118, 9.896, 10.768, 11.746, 12.848],
    77.5: [7.865, 8.499, 9.204, 9.990, 10.870, 11.858, 12.972],
    78.0: [7.938, 8.578, 9.289, 10.083, 10.971, 11.968, 13.092],
    78.5: [8.010, 8.655, 9.373, 10.174, 11.070, 12.077, 13.211],
    79.0: [8.082, 8.733, 9.457, 10.265, 11.169, 12.184, 13.328],
    79.5: [8.154, 8.811, 9.541, 10.356, 11.267, 12.291, 13.445],
    80.0: [8.227, 8.890, 9.626, 10.448, 11.367, 12.399, 13.561],
    80.5: [8.302, 8.970, 9.712, 10.540, 11.467, 12.507, 13.679],
    81.0: [8.379, 9.052, 9.800, 10.635, 11.569, 12.617, 13.798],
    81.5: [8.457, 9.136, 9.891, 10.732, 11.673, 12.730, 13.92],
    82.0: [8.538, 9.223, 9.984, 10.832, 11.781, 12.845, 14.044],
    82.5: [8.623, 9.313, 10.080, 10.935, 11.891, 12.964, 14.172],
    83.0: [8.710, 9.406, 10.179, 11.042, 12.005, 13.086, 14.303],
    83.5: [8.800, 9.503, 10.282, 11.152, 12.123, 13.213, 14.439],
    84.0: [8.894, 9.602, 10.389, 11.265, 12.244, 13.342, 14.578],
    84.5: [8.990, 9.705, 10.498, 11.382, 12.369, 13.476, 14.721],
    85.0: [9.088, 9.809, 10.610, 11.501, 12.496, 13.612, 14.866],
    85.5: [9.189, 9.916, 10.723, 11.622, 12.625, 13.750, 15.014],
    86.0: [9.290, 10.024, 10.838, 11.744, 12.756, 13.890, 15.163],
    86.5: [9.392, 10.133, 10.954, 11.868, 12.888, 14.030, 15.314],
    87.0: [9.637, 10.393, 11.232, 12.164, 13.205, 14.370, 15.677],
    87.5: [9.738, 10.501, 11.347, 12.287, 13.336, 14.510, 15.828],
    88.0: [9.838, 10.607, 11.460, 12.409, 13.467, 14.650, 15.979],
    88.5: [9.937, 10.713, 11.573, 12.530, 13.597, 14.790, 16.129],
    89.0: [10.034, 10.817, 11.685, 12.650, 13.725, 14.928, 16.278],
    89.5: [10.130, 10.920, 11.795, 12.768, 13.853, 15.066, 16.428],
    90.0: [10.226, 11.022, 11.905, 12.886, 13.980, 15.204, 16.576],
    90.5: [10.320, 11.123, 12.014, 13.004, 14.107, 15.341, 16.725],
    91.0: [10.414, 11.224, 12.123, 13.121, 14.234, 15.478, 16.874],
    91.5: [10.507, 11.324, 12.231, 13.238, 14.360, 15.615, 17.024],
    92.0: [10.599, 11.424, 12.338, 13.354, 14.487, 15.753, 17.174],
    92.5: [10.691, 11.523, 12.445, 13.470, 14.613, 15.891, 17.325],
    93.0: [10.782, 11.622, 12.552, 13.587, 14.740, 16.030, 17.477],
    93.5: [10.873, 11.721, 12.660, 13.704, 14.868, 16.170, 17.63],
    94.0: [10.964, 11.820, 12.768, 13.822, 14.997, 16.311, 17.786],
    94.5: [11.056, 11.919, 12.876, 13.940, 15.127, 16.454, 17.943],
    95.0: [11.148, 12.020, 12.986, 14.060, 15.258, 16.598, 18.103],
    95.5: [11.241, 12.121, 13.096, 14.181, 15.391, 16.745, 18.265],
    96.0: [11.334, 12.223, 13.208, 14.304, 15.526, 16.894, 18.43],
    96.5: [11.428, 12.326, 13.321, 14.428, 15.663, 17.046, 18.599],
    97.0: [11.524, 12.430, 13.436, 14.555, 15.803, 17.201, 18.771],
    97.5: [11.620, 12.536, 13.552, 14.683, 15.946, 17.359, 18.948],
    98.0: [11.718, 12.644, 13.671, 14.814, 16.090, 17.520, 19.127],
    98.5: [11.817, 12.752, 13.791, 14.947, 16.238, 17.684, 19.311],
    99.0: [11.917, 12.863, 13.913, 15.082, 16.388, 17.852, 19.498],
    99.5: [12.018, 12.974, 14.036, 15.219, 16.540, 18.022, 19.688],
    100.0: [12.120, 13.087, 14.161, 15.358, 16.695, 18.195, 19.883],
    100.5: [12.224, 13.201, 14.288, 15.498, 16.852, 18.371, 20.081],
    101.0: [12.328, 13.317, 14.416, 15.641, 17.012, 18.550, 20.282],
    101.5: [12.433, 13.433, 14.545, 15.786, 17.173, 18.731, 20.487],
    102.0: [12.539, 13.551, 14.676, 15.932, 17.337, 18.915, 20.694],
    102.5: [12.647, 13.670, 14.809, 16.080, 17.503, 19.102, 20.904],
    103.0: [12.755, 13.791, 14.943, 16.230, 17.671, 19.291, 21.118],
    103.5: [12.865, 13.912, 15.079, 16.381, 17.841, 19.482, 21.334],
    104.0: [12.975, 14.035, 15.215, 16.534, 18.013, 19.675, 21.553],
    104.5: [13.086, 14.159, 15.353, 16.689, 18.186, 19.871, 21.775],
    105.0: [13.198, 14.283, 15.493, 16.845, 18.362, 20.070, 22],
    105.5: [13.312, 14.410, 15.634, 17.004, 18.540, 20.271, 22.227],
    106.0: [13.426, 14.537, 15.777, 17.164, 18.721, 20.475, 22.458],
    106.5: [13.542, 14.667, 15.921, 17.326, 18.903, 20.680, 22.692],
    107.0: [13.658, 14.797, 16.067, 17.489, 19.088, 20.890, 22.93],
    107.5: [13.776, 14.928, 16.214, 17.655, 19.274, 21.101, 23.17],
    108.0: [13.895, 15.061, 16.363, 17.823, 19.464, 21.316, 23.415],
    108.5: [14.015, 15.195, 16.514, 17.992, 19.655, 21.533, 23.662],
    109.0: [14.137, 15.332, 16.667, 18.164, 19.850, 21.754, 23.913],
    109.5: [14.260, 15.470, 16.822, 18.339, 20.047, 21.978, 24.169],
    110.0: [14.385, 15.609, 16.979, 18.516, 20.247, 22.205, 24.428],
    110.5: [14.511, 15.751, 17.138, 18.695, 20.450, 22.435, 24.69],
    111.0: [14.639, 15.894, 17.298, 18.876, 20.655, 22.668, 24.955],
    111.5: [14.768, 16.038, 17.461, 19.059, 20.862, 22.903, 25.224],
    112.0: [14.898, 16.184, 17.624, 19.244, 21.071, 23.141, 25.496],
    112.5: [15.029, 16.331, 17.790, 19.430, 21.282, 23.381, 25.77],
    113.0: [15.162, 16.479, 17.957, 19.618, 21.495, 23.623, 26.047],
    113.5: [15.296, 16.629, 18.125, 19.808, 21.710, 23.868, 26.325],
    114.0: [15.429, 16.779, 18.294, 19.999, 21.927, 24.114, 26.607],
    114.5: [15.565, 16.931, 18.464, 20.191, 22.144, 24.362, 26.891],
    115.0: [15.700, 17.083, 18.635, 20.385, 22.364, 24.612, 27.176],
    115.5: [15.836, 17.236, 18.807, 20.579, 22.584, 24.863, 27.463],
    116.0: [15.974, 17.389, 18.980, 20.774, 22.805, 25.115, 27.752],
    116.5: [16.111, 17.543, 19.153, 20.970, 23.028, 25.368, 28.042],
    117.0: [16.248, 17.697, 19.327, 21.167, 23.251, 25.623, 28.334],
    117.5: [16.385, 17.852, 19.501, 21.364, 23.475, 25.879, 28.627],
    118.0: [16.523, 18.006, 19.676, 21.561, 23.699, 26.135, 28.921],
    118.5: [16.660, 18.161, 19.850, 21.759, 23.924, 26.392, 29.216],
    119.0: [16.798, 18.316, 20.025, 21.957, 24.150, 26.650, 29.512],
    119.5: [16.935, 18.470, 20.199, 22.155, 24.375, 26.908, 29.81],
    120.0: [17.072, 18.624, 20.374, 22.353, 24.601, 27.167, 30.107],
};

const femaleMapHFA = {
    0: [43.6, 45.4, 47.3, 49.1, 51.0, 52.9, 54.7],
    1: [47.8, 49.8, 51.7, 53.7, 55.6, 57.6, 59.5],
    2: [51.0, 53.0, 55.0, 57.1, 59.1, 61.1, 63.2],
    3: [53.5, 55.6, 57.7, 59.8, 61.9, 64.0, 66.1],
    4: [55.6, 57.8, 59.9, 62.1, 64.3, 66.4, 68.6],
    5: [57.4, 59.6, 61.8, 64.0, 66.2, 68.5, 70.7],
    6: [58.9, 61.2, 63.5, 65.7, 68.0, 70.3, 72.5],
    7: [60.3, 62.7, 65.0, 67.3, 69.6, 71.9, 74.2],
    8: [61.7, 64.0, 66.4, 68.7, 71.1, 73.5, 75.8],
    9: [62.9, 65.3, 67.7, 70.1, 72.6, 75.0, 77.4],
    10: [64.1, 66.5, 69.0, 71.5, 73.9, 76.4, 78.9],
    11: [65.2, 67.7, 70.3, 72.8, 75.3, 77.8, 80.3],
    12: [66.3, 68.9, 71.4, 74.0, 76.6, 79.2, 81.7],
    13: [67.3, 70.0, 72.6, 75.2, 77.8, 80.5, 83.1],
    14: [68.3, 71.0, 73.7, 76.4, 79.1, 81.7, 84.4],
    15: [69.3, 72.0, 74.8, 77.5, 80.2, 83.0, 85.7],
    16: [70.2, 73.0, 75.8, 78.6, 81.4, 84.2, 87.0],
    17: [71.1, 74.0, 76.8, 79.7, 82.5, 85.4, 88.2],
    18: [72.0, 74.9, 77.8, 80.7, 83.6, 86.5, 89.4],
    19: [72.8, 75.8, 78.8, 81.7, 84.7, 87.6, 90.6],
    20: [73.7, 76.7, 79.7, 82.7, 85.7, 88.7, 91.7],
    21: [74.5, 77.5, 80.6, 83.7, 86.7, 89.8, 92.9],
    22: [75.2, 78.4, 81.5, 84.6, 87.7, 90.8, 94.0],
    23: [76.0, 79.2, 82.3, 85.5, 88.7, 91.9, 95.0],
    24: [76.7, 80.0, 83.2, 86.4, 89.6, 92.9, 96.1],
    25: [76.8, 80.0, 83.3, 86.6, 89.9, 93.1, 96.4],
    26: [77.5, 80.8, 84.1, 87.4, 90.8, 94.1, 97.4],
    27: [78.1, 81.5, 84.9, 88.3, 91.7, 95.0, 98.4],
    28: [78.8, 82.2, 85.7, 89.1, 92.5, 96.0, 99.4],
    29: [79.5, 82.9, 86.4, 89.9, 93.4, 96.9, 100.3],
    30: [80.1, 83.6, 87.1, 90.7, 94.2, 97.7, 101.3],
    31: [80.7, 84.3, 87.9, 91.4, 95.0, 98.6, 102.2],
    32: [81.3, 84.9, 88.6, 92.2, 95.8, 99.4, 103.1],
    33: [81.9, 85.6, 89.3, 92.9, 96.6, 100.3, 103.9],
    34: [82.5, 86.2, 89.9, 93.6, 97.4, 101.1, 104.8],
    35: [83.1, 86.8, 90.6, 94.4, 98.1, 101.9, 105.6],
    36: [83.6, 87.4, 91.2, 95.1, 98.9, 102.7, 106.5],
    37: [84.2, 88.0, 91.9, 95.7, 99.6, 103.4, 107.3],
    38: [84.7, 88.6, 92.5, 96.4, 100.3, 104.2, 108.1],
    39: [85.3, 89.2, 93.1, 97.1, 101.0, 105.0, 108.9],
    40: [85.8, 89.8, 93.8, 97.7, 101.7, 105.7, 109.7],
    41: [86.3, 90.4, 94.4, 98.4, 102.4, 106.4, 110.5],
    42: [86.8, 90.9, 95.0, 99.0, 103.1, 107.2, 111.2],
    43: [87.4, 91.5, 95.6, 99.7, 103.8, 107.9, 112.0],
    44: [87.9, 92.0, 96.2, 100.3, 104.5, 108.6, 112.7],
    45: [88.4, 92.5, 96.7, 100.9, 105.1, 109.3, 113.5],
    46: [88.9, 93.1, 97.3, 101.5, 105.8, 110.0, 114.2],
    47: [89.3, 93.6, 97.9, 102.1, 106.4, 110.7, 114.9],
    48: [89.8, 94.1, 98.4, 102.7, 107.0, 111.3, 115.7],
    49: [90.3, 94.6, 99.0, 103.3, 107.7, 112.0, 116.4],
    50: [90.7, 95.1, 99.5, 103.9, 108.3, 112.7, 117.1],
    51: [91.2, 95.6, 100.1, 104.5, 108.9, 113.3, 117.7],
    52: [91.7, 96.1, 100.6, 105.0, 109.5, 114.0, 118.4],
    53: [92.1, 96.6, 101.1, 105.6, 110.1, 114.6, 119.1],
    54: [92.6, 97.1, 101.6, 106.2, 110.7, 115.2, 119.8],
    55: [93.0, 97.6, 102.2, 106.7, 111.3, 115.9, 120.4],
    56: [93.4, 98.1, 102.7, 107.3, 111.9, 116.5, 121.1],
    57: [93.9, 98.5, 103.2, 107.8, 112.5, 117.1, 121.8],
    58: [94.3, 99.0, 103.7, 108.4, 113.0, 117.7, 122.4],
    59: [94.7, 99.5, 104.2, 108.9, 113.6, 118.3, 123.1],
    60: [95.2, 99.9, 104.7, 109.4, 114.2, 118.9, 123.7],
};

const maleMapHFA = {
    0: [44.2, 46.1, 48.0, 49.9, 51.8, 53.7, 55.6],
    1: [48.9, 50.8, 52.8, 54.7, 56.7, 58.6, 60.6],
    2: [52.4, 54.4, 56.4, 58.4, 60.4, 62.4, 64.4],
    3: [55.3, 57.3, 59.4, 61.4, 63.5, 65.5, 67.6],
    4: [57.6, 59.7, 61.8, 63.9, 66.0, 68.0, 70.1],
    5: [59.6, 61.7, 63.8, 65.9, 68.0, 70.1, 72.2],
    6: [61.2, 63.3, 65.5, 67.6, 69.8, 71.9, 74.0],
    7: [62.7, 64.8, 67.0, 69.2, 71.3, 73.5, 75.7],
    8: [64.0, 66.2, 68.4, 70.6, 72.8, 75.0, 77.2],
    9: [65.2, 67.5, 69.7, 72.0, 74.2, 76.5, 78.7],
    10: [66.4, 68.7, 71.0, 73.3, 75.6, 77.9, 80.1],
    11: [67.6, 69.9, 72.2, 74.5, 76.9, 79.2, 81.5],
    12: [68.6, 71.0, 73.4, 75.7, 78.1, 80.5, 82.9],
    13: [69.6, 72.1, 74.5, 76.9, 79.3, 81.8, 84.2],
    14: [70.6, 73.1, 75.6, 78.0, 80.5, 83.0, 85.5],
    15: [71.6, 74.1, 76.6, 79.1, 81.7, 84.2, 86.7],
    16: [72.5, 75.0, 77.6, 80.2, 82.8, 85.4, 88.0],
    17: [73.3, 76.0, 78.6, 81.2, 83.9, 86.5, 89.2],
    18: [74.2, 76.9, 79.6, 82.3, 85.0, 87.7, 90.4],
    19: [75.0, 77.7, 80.5, 83.2, 86.0, 88.8, 91.5],
    20: [75.8, 78.6, 81.4, 84.2, 87.0, 89.8, 92.6],
    21: [76.5, 79.4, 82.3, 85.1, 88.0, 90.9, 93.8],
    22: [77.2, 80.2, 83.1, 86.0, 89.0, 91.9, 94.9],
    23: [78.0, 81.0, 83.9, 86.9, 89.9, 92.9, 95.9],
    24: [78.0, 81.0, 84.1, 87.1, 90.2, 93.2, 96.3],
    25: [78.6, 81.7, 84.9, 88.0, 91.1, 94.2, 97.3],
    26: [79.3, 82.5, 85.6, 88.8, 92.0, 95.2, 98.3],
    27: [79.9, 83.1, 86.4, 89.6, 92.9, 96.1, 99.3],
    28: [80.5, 83.8, 87.1, 90.4, 93.7, 97.0, 100.3],
    29: [81.1, 84.5, 87.8, 91.2, 94.5, 97.9, 101.2],
    30: [81.7, 85.1, 88.5, 91.9, 95.3, 98.7, 102.1],
    31: [82.3, 85.7, 89.2, 92.7, 96.1, 99.6, 103.0],
    32: [82.8, 86.4, 89.9, 93.4, 96.9, 100.4, 103.9],
    33: [83.4, 86.9, 90.5, 94.1, 97.6, 101.2, 104.8],
    34: [83.9, 87.5, 91.1, 94.8, 98.4, 102.0, 105.6],
    35: [84.4, 88.1, 91.8, 95.4, 99.1, 102.7, 106.4],
    36: [85.0, 88.7, 92.4, 96.1, 99.8, 103.5, 107.2],
    37: [85.5, 89.2, 93.0, 96.7, 100.5, 104.2, 108.0],
    38: [86.0, 89.8, 93.6, 97.4, 101.2, 105.0, 108.8],
    39: [86.5, 90.3, 94.2, 98.0, 101.8, 105.7, 109.5],
    40: [87.0, 90.9, 94.7, 98.6, 102.5, 106.4, 110.3],
    41: [87.5, 91.4, 95.3, 99.2, 103.2, 107.1, 111.0],
    42: [88.0, 91.9, 95.9, 99.9, 103.8, 107.8, 111.7],
    43: [88.4, 92.4, 96.4, 100.4, 104.5, 108.5, 112.5],
    44: [88.9, 93.0, 97.0, 101.0, 105.1, 109.1, 113.2],
    45: [89.4, 93.5, 97.5, 101.6, 105.7, 109.8, 113.9],
    46: [89.8, 94.0, 98.1, 102.2, 106.3, 110.4, 114.6],
    47: [90.3, 94.4, 98.6, 102.8, 106.9, 111.1, 115.2],
    48: [90.7, 94.9, 99.1, 103.3, 107.5, 111.7, 115.9],
    49: [91.2, 95.4, 99.7, 103.9, 108.1, 112.4, 116.6],
    50: [91.6, 95.9, 100.2, 104.4, 108.7, 113.0, 117.3],
    51: [92.1, 96.4, 100.7, 105.0, 109.3, 113.6, 117.9],
    52: [92.5, 96.9, 101.2, 105.6, 109.9, 114.2, 118.6],
    53: [93.0, 97.4, 101.7, 106.1, 110.5, 114.9, 119.2],
    54: [93.4, 97.8, 102.3, 106.7, 111.1, 115.5, 119.9],
    55: [93.9, 98.3, 102.8, 107.2, 111.7, 116.1, 120.6],
    56: [94.3, 98.8, 103.3, 107.8, 112.3, 116.7, 121.2],
    57: [94.7, 99.3, 103.8, 108.3, 112.8, 117.4, 121.9],
    58: [95.2, 99.7, 104.3, 108.9, 113.4, 118.0, 122.6],
    59: [95.6, 100.2, 104.8, 109.4, 114.0, 118.6, 123.2],
    60: [96.1, 100.7, 105.3, 110.0, 114.6, 119.2, 123.9],
};

function findDeviationLimits(weight, sdArray) {
    let lowerLimitIn;
    let higherLimitIn;
    // find the standard deviation interval
    for (let i = 0; i < 7; i++) {
        if (weight >= sdArray[i]) {
            lowerLimitIn = i;

            if (weight > sdArray[i]) {
                // eslint-disable-next-line no-continue
                continue;
            }
        }

        higherLimitIn = i;
        break;
    }
    return { lowerLimitIn, higherLimitIn };
}

function getZScoreFromMap(key, value, map) {
    const sdArray = map[Number(key)];

    if (value < sdArray[0]) { return -3.5; }
    if (value > sdArray[6]) { return 3.5; }

    const deviationLimits = findDeviationLimits(value, sdArray);
    const higherLimitIn = deviationLimits.higherLimitIn;
    const lowerLimitIn = deviationLimits.lowerLimitIn;

    // Find the distance between the two SDs in the common unit.
    const distance = sdArray[higherLimitIn] - sdArray[lowerLimitIn];

    // The gap from the intervals top limit down to the actual value:
    const gap = sdArray[higherLimitIn] - value;

    // The decimal places this gap represent from the higher SD
    const decimalSubtraction = distance > 0 ? gap / distance : 0;

    return (higherLimitIn - 3 - decimalSubtraction).toFixed(2);
}

export function getZScoreWFA(ageInMonths, weight, gender) {
    let map = femaleMapWFA;

    if (maleCodes[gender] === 1) {
        map = maleMapWFA;
    }

    return getZScoreFromMap(Math.round(ageInMonths), weight, map);
}

export function getZScoreHFA(ageInMonths, heightInCm, gender) {
    let map = femaleMapHFA;

    if (maleCodes[gender] === 1) {
        map = maleMapHFA;
    }

    return getZScoreFromMap(Math.round(ageInMonths), heightInCm, map);
}

export function getZScoreWFH(heightInCm, weight, gender) {
    let map = femaleMapWFH;

    if (maleCodes[gender] === 1) {
        map = maleMapWFH;
    }

    return getZScoreFromMap(Math.round(heightInCm * 2) / 2, weight, map);
}
