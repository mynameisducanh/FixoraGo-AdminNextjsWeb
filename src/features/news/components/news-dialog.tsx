'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import NewsApi from '@/api/newsApi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import Tiptap from './tiptap'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  image: z.instanceof(File, { message: 'File is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
})

type NewsForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewsDialog({ open, onOpenChange }: Props) {
  const newsApi = new NewsApi()
  const form = useForm<NewsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      image: undefined,
      description: '',
      content: '',
    },
  })

  const onSubmit = async (values: NewsForm) => {
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('file', values.image)
      formData.append('description', values.description)
      formData.append('content', values.content)

      const res = await newsApi.create(formData)
      console.log(res)
      toast.success('News created successfully')
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create news')
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconPlus /> Create News
          </DialogTitle>
          <DialogDescription>
            Create a new news article. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='news-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter news title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter news description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ScrollArea className='h-[300px] w-full rounded-md border'>
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                      />
                    </ScrollArea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='submit' form='news-form'>
            Create News
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
