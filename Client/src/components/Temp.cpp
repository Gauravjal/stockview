//write a code for binary search
int binarySearch(int *a, int start, int end, int value) {
  int mid = (start + end) / 2;
  while (start <= end) {
    if (a[mid] == value)
      return mid;
    else if (a[mid] > value)
      end = mid - 1;
    else
      start = mid + 1;
    mid = (start + end) / 2;
  }
  return -1;
}

//write a code for binary sort
void binarySort(int *a, int n, int *out) {
  int start = 0;
  int end = n - 1;
  int mid;
  while (start <= end) {
    mid = (start + end) / 2;
    if (a[mid] > a[end]) {
      //we need to move the start pointer up one
      int temp = a[end];
      for (int i = end; i > mid; i--)
        a[i + 1] = a[i];
      a[mid] = temp;
      end--;
    } else if (a[mid]< a[start]) {
      //we need to move the end pointer down one
      int temp = a[start];
      for (int i = start; i < mid; i++)
        a[i + 1] = a[i];
      a[mid] = temp;
      start++;
    } else {
      //we found a spot
      start++;
    }
  }
}
