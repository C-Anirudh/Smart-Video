from gensim.summarization.summarizer import summarize

__author__ = "Priyadarshini Murugan"
__copyright__ = "Copyright 2020, Smart Video"
__version__ = "1.0.0"
__maintainer__ = "Priyadarshini Murugan"
__email__ = "msvdpriya@gmail.com"

def get_summary(text):
    num_of_words = len(text.split())
    print('[info] total size: ' + str(num_of_words))
 
    if num_of_words >= 5000:
        return (summarize(text,0.05))
    elif num_of_words >= 3000 and num_of_words < 5000 :
        return (summarize(text,0.1))
    elif num_of_words >= 1000 and num_of_words < 3000 :
        return (summarize(text,0.2))
    else:
        return (summarize(text,0.3))


def get_summary_with_ratio(text, ratio):
    return (summarize(text,0.5, split=True))

def get_summary_with_word_count(text, word_count):
    return (summarize(text,word_count = word_count, split=True))