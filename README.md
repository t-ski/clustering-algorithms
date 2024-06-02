# Clustering Algorithms

Pure TypeScript implementations of common clustering algorithms.

``` ts
type TVector = number[];
type TMatrix[] = number[][];
type TCluster = TVector[];

interface AClustering {
    clusters: TCluster[];
}
```

``` ts
// e.g.
import { KMeans } from "t-ski/clustering-algorithms"
```

## Utilities

### Distance Metric

``` ts
util.Distance.<metric>(p1: TVector, p2: TVector = []): number
```

| Metric | Identifier (`<metric>`) |
| :- | :- |
| Euclidean (2-Norm) `default` | `euclidean` |
| Manhattan | `manhattan` |
| Chebyshev | `chebyshev` |
| Cosine (normal) | `cosine` |

``` ts
const clusters = new KMeans(data, 3)
.setDistanceMetric(util.Distance.manhattan)
.clusters
```

### Quality Coefficient

``` ts
util.Quality.silhouetteCoefficient(clusters: TCluster[]): number
```

##

<sub>&copy; Thassilo Martin Schiepanski</sub>