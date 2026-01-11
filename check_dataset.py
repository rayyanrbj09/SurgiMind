from phase_dataset import PhaseSequenceDataset

train_dirs = [
    "/home/sagemaker-user/surgimind01/Training/VID02"
]

ds = PhaseSequenceDataset(train_dirs, seq_len=10)

print("Samples:", len(ds))
x, y = ds[0]
print("X shape:", x.shape)
print("Label:", y)
