---
title: "Introduction to Tree-based methods"
excerpt: ""
date: "2026-01-25"
type: "math"
outline: true
tags: ["math", "ML"]
---

<span class="invisible absolute" id="basic-idea"></span>
#### Basic Idea
Let's consider the usual setup of a 
[supervised learning](https://en.wikipedia.org/wiki/Supervised_learning) problem with $n$
data points and $p$ predictors. 

<!-- Suppose
we have responses $Y_i$ and predictors
$X_{ij}$ for $i = 1,\ldots,n$ and $j=1,\ldots, p$. -->

It's intuitive that points _close_ to
one another in the predictor space should have
_similar_ outputs. This is the idea
behind [$k$-NN (k-Nearest Neighbours)](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm). Take a distance metric, pick a $k$ (how many nearest neighbours to look at),
and decide how to predict (for example, by averaging or a majority vote).

Another reasonable claim is that there's a partition
of the predictor space into regions such that 
points in a region have similar values of the response.
This is similar to $k$-NN in that it's a local method,
except that closeness isn't
measured by distance from points but instead by belonging
in a region. Tree-based methods take this approach.
<!-- = (x_1, \ldots, x_p)  -->
More concretely, let's consider an out-of-sample point $\mathbf{x}$.
The idea is (1) to partition the predictor space into regions $R_1, \ldots, R_m$,
(2) check which region $\mathbf{x}$ belongs to, and then (3) guess the value based on this region. Steps (1) and (3) make use
of the training data.

These regions can be arbitrary making the problem ill-posed.
In fact, even if we only consider the partition into
hyperrectangles, they can be staggered and hard to define. So
we simplify the problem further by allowing
only recursive binary partitions. I.e. any region
can only be split further into two rectangular regions — the
hyperrectangles are always neatly stacked.

Now, more choices need to be made based on the problem,
so we consider [regression](https://en.wikipedia.org/wiki/Regression_analysis)  and [classification](https://en.wikipedia.org/wiki/Classification) separately.

<!-- ($Y_i \in \mathbb{R}$)
($Y_i \in \{1, \ldots, k\}$) -->

<span class="invisible absolute" id="regression"></span>
#### Regression
We want to answer: how to make the regions and how to predict values within them. In supervised learning this reduces to choosing a
cost function and finding the parameters
(the regions and guess values in this case)
that minimize it on the observed data.

Suppose we already have the partition into regions, and for a region $R_j$ we decide to predict the constant value $c_j$ to minimize
the mean squared error (MSE). Then our estimate of
the underlying function is
$$
\begin{align*}
    \hat{f}(\mathbf{x}) = \sum_{j = 1}^{m}c_j \mathbf{1}_{R_j}(\mathbf{x}),
\end{align*}
$$
and the MSE is
$$
\begin{align*}
    \sum_{i=1}^{n}\left(y_i - \hat{f}(\mathbf{x}_i) \right)^2.
\end{align*}
$$
Note that the MSE can be split into
sums over the regions:
$$
\begin{align*}
    \sum_{i=1}^{n}\left(y_i - \hat{f}(\mathbf{x}_i) \right)^2 &= \sum_{j=1}^{m} \sum_{\mathbf{x}_i \in R_j}^{} \left(y_i - \hat{f}(\mathbf{x}_i) \right)^2,
\end{align*}
$$
and hence, the $c_j$s that minimize the MSE
are easily obtained by the mean of
responses in the regions:
$$
\begin{align*}
    c_j = \frac{1}{|{\{\mathbf{x}_i \in R_j\}|}} \sum_{\mathbf{x}_i \in R_j} y_i \text{.}
\end{align*}
$$

It turns out that finding the best possible partition
that gives the lowest MSE is also computationally infeasible. So we take a greedy, iterative approach. At each step, we look at all possible splits
for all possible predictors in a region, and
choose the predictor and split that gives the largest reduction in MSE. The two new regions are added to the queue of all regions and the process can continue (in principle) till there's only one data point left in each region.

<span class="invisible absolute" id="pros-and-cons"></span>
#### Pros and cons
Although this algorithm is easy to implement and gives interpretable decision trees, they have a high variance and generalize poorly. I.e. the fully-grown trees overfit the training data and have low predictive power.

At the level of individual trees this is tackled by specifying growth constraints, or by cost complexity pruning. But there are ways to combine multiple weak trees to get a strong estimator that are much more effective — namely bagging and boosting.


&nbsp;

<span class="invisible absolute" id="references"></span>
#### References
[1] Hastie, Trevor, Robert Tibshirani, and Jerome Friedman. _The Elements of Statistical Learning: Data Mining, Inference, and Prediction_. 2nd ed. Springer Series in Statistics. New York: Springer, 2009. [https://doi.org/10.1007/978-0-387-84858-7](https://doi.org/10.1007/978-0-387-84858-7).

[2] James, Gareth, Daniela Witten, Trevor Hastie, and Robert Tibshirani. _An Introduction to Statistical Learning: with Applications in Python_. 2nd ed. Springer Texts in Statistics. Cham: Springer, 2023. [https://doi.org/10.1007/978-3-031-38747-0](https://doi.org/10.1007/978-3-031-38747-0).