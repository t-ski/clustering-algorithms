# Clustering Algorithms

Pure TypeScript implementations of common clustering algorithms.

[1. Interface](#interface)
&emsp;|&emsp;
[2. Algorithms](#algorithms)
&emsp;|&emsp;
[3. Utilities](#utilities)

## Interface

``` ts
import * as clA from "t-ski/clustering-algorithms"
```

``` ts
type TVector = number[]
type TMatrix[] = number[][]
type TCluster = TVector[]

interface AClustering<O = TCluster> {
    clusters: O[]
}
```

## Algorithms

![Vector-based Plots](./examples.vector.png)

``` ts
clA.<algorithm>(data: I[], ...args): AClustering<I>
```

### Centroid-based

``` ts
clA.<algorithm>(data: number[]|TVector[], k: number = 2): AClustering
```

``` ts
new clA.KMeans(DATA, 3).clusters;
```

#### k-Means

`O(n²) | Θ(n)`

``` ts
clA.KMeans(data, k?)
```

#### k-Means++

`O(n²) | Θ(n)`

``` ts
clA.KMeansPP(data, k?)
```

#### k-Medoids

`O(n²) | Θ(n)`

``` ts
clA.KMedoids(data, k?)
```

---

### Density-based

``` ts
clA.<algorithm>(data: number[]|TVector[], epsilon?: number): AClustering
```

> If not defined, the epsilon parameter is estimated from the given data.

``` ts
new clA.MeanShift(DATA, 2).clusters;
```

#### MeanShift

`O = Θ(n²)`

``` ts
clA.MeanShift(data, epsilon?): AClustering & { noise: TCluster }
```

#### DBSCAN

`O(n²) | Θ(n log n)`

``` ts
clA.DBSCAN(data, epsilon?, minPoints: number = 4): AClustering & { noise: TCluster }
```

#### OPTICS

`O(n²) | Θ(n log n)`

``` ts
clA.OPTICS(data, epsilon?, minPoints: number = 4): AClustering & { noise: TCluster }
```

---

### Graph-based

![Graph-based Plots](./examples.graph.png)

``` ts
clA.<algorithm>(adjacencyMatrix: TMatrix, k: number = 2): AClustering<number[]>
```

> Input to graph-based clustering is a target graph's adjacency matrix. Output corresponds to clusters of related graph node indexes.

``` ts
new clA.ConnectedComponents(DATA).clusters;
```

#### Connected Components

`O = Θ(n³)`

``` ts
clA.ConnectedComponents(adjacencyMatrix)
```

#### Divisive Clustering

`O = Θ(n³)`

``` ts
clA.Divisive(adjacencyMatrix, k: number = 2)
```

#### Markov Clustering (MCL)

`O = Θ(n³)`

``` ts
clA.Markov(adjacencyMatrix, e: number = 2, r: number = 2)
```

---

### Hierarchy-based

``` ts
clA.<algorithm>(data: number[]|TVector[], k: number = 2): AClustering
```

``` ts
new clA.AverageLinkage(DATA, 4).clusters;
```

#### Average Linkage

`O = Θ(n³)`

``` ts
clA.AverageLinkage(data, k?)
```

#### Centroid Linkage

`O = Θ(n³)`

``` ts
clA.CentroidLinkage(data, k?)
```

#### Complete Linkage

`O = Θ(n³)`

``` ts
clA.CompleteLinkage(data, k?)
```

#### Hausdorff Linkage

`O = Θ(n³)`

``` ts
clA.HausdorffLinkage(data, k?)
```

#### Median Linkage

`O = Θ(n³)`

``` ts
clA.MedianLinkage(data, k?)
```

#### Single Linkage

`O = Θ(n³)`

``` ts
clA.SingleLinkage(data, k?)
```

#### Ward

`O = Θ(n³)`

``` ts
clA.Ward(data, k?)
```

## Utilities

### Distance Metrics

`f: (ℝ×…×ℝ)² ↦ ℕ`

``` ts
clA.util.distance.<metric>(p1: TVector, p2: TVector = []): number
```

``` ts
clA.AClustering.setDistanceMetric(util.distance.manhattan);

const clusters = new clA.KMeans(DATA, 3).clusters;
```

#### Euclidean (2-Norm) `default`

``` ts
clA.util.distance.euclidean(p1: TVector, p2: TVector = []): number
```

#### Manhattan 

``` ts
clA.util.distance.manhattan(p1: TVector, p2: TVector = []): number
```

#### Chebyshev 

``` ts
clA.util.distance.chebyshev(p1: TVector, p2: TVector = []): number
```

#### Cosine (normal)

``` ts
clA.util.distance.cosine(p1: TVector, p2: TVector = []): number
```

---

### Quality Metrics

``` ts
clA.util.quality.<metric>(clusters: TCluster[]): number
```

``` ts
const clusters = new clA.KMeans(DATA, 3).clusters;

const clusteringQuality = clA.util.quality.silhouetteCoefficient(clusters);
```

#### Silhouette Coefficient

`f: ℕ×(ℝ×…×ℝ) ↦ [-1,1] → 1`

``` ts
clA.util.quality.silhouetteCoefficient(clusters: TCluster[]): number
```

#### Dunn Index

`f: ℕ×(ℝ×…×ℝ) ↦ [0,∞) → ∞`

``` ts
clA.util.quality.dunnIndex(clusters: TCluster[]): number
```

#### Davies-Bouldin Index

`f: ℕ×(ℝ×…×ℝ) ↦ [0,∞) → 0`

``` ts
clA.util.quality.daviesBouldinIndex(clusters: TCluster[]): number
```

---

### Vector Data Map

The `VectorDataMap` utility class helps with associating arbitrary entites with data points ([view example](./example/example.js)).

``` ts
type TDataPoint<T> = [ TVector, T ]

new clA.util.VectorDataMap<T>(data: TDataPoint<T>[]): {
    vectors: TVector[];
    
    getEntity: (vector: TVector) => T|T[];
    getVector: (entity: T) => TVector;
    getCluster: (clusters: TCluster[], vector: TVector) => number|number[];
    getCluster: (clusters: TCluster[], entity: T) => number|number[];
}
```

##

<sub>&copy; Thassilo Martin Schiepanski</sub>