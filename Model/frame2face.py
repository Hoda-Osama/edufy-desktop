import subprocess
import os
import threading


def main(frame_dir, face_dir, n_thread):
    threads = []
    # function
    func_path = 'align/face_align_cuda.py'
    # Model
    predictor_path = 'align/shape_predictor_5_face_landmarks.dat'
    cnn_face_detector = 'align/mmod_human_face_detector.dat'

    frame2face( func_path, predictor_path, frame_dir, face_dir, cnn_face_detector)

    #run_threads(threads, n_thread)
    print('all is over')


def run_threads(threads, n_thread):
    used_thread = []
    for num, new_thread in enumerate(threads):
        print('thread index: {:}'.format(num), end=' \t')
        new_thread.start()
        used_thread.append(new_thread)

        if num % n_thread == 0:
            for old_thread in used_thread:
                old_thread.join()
            used_thread = []


class threadFun(threading.Thread):
    def __init__(self, func, args):
        super(threadFun, self).__init__()
        self.fun = func
        self.args = args

    def run(self):
        self.fun(*self.args)


def frame2face(func_path, predictor_path, image_root_folder, save_root_folder, cnn_face_detector, gpu_id=0):
    linux_command = 'python {:} {:} {:} {:} {:} {:}'.format(func_path, predictor_path, image_root_folder,
                                                            save_root_folder, cnn_face_detector, gpu_id)
    print('{:}'.format(image_root_folder))
    x,y= subprocess.getstatusoutput(linux_command)
    print("x")
    print(x)
    print(y)


if __name__ == '__main__':
    frame_dir_train_afew = 'videos'
    face_dir_train_afew = 'face'
    main(frame_dir_train_afew, face_dir_train_afew, n_thread=20)

